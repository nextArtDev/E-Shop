'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './getCurrentUser'
import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function createProduct(params: Product) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') return

    const { name, description, price, brand, category, inStock, images, path } =
      params
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        images,
      },
    })

    revalidatePath(path)

    return product
  } catch (error) {
    console.log(error)
    throw error
  }
}
