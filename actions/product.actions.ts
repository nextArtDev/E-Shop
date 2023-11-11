'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './getCurrentUser'
import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { ChangeEvent } from 'react'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'
const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function createProductAction(params: any) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') return

    console.log(params)
    const { name, description, price, brand, category, inStock, path } =
      JSON.parse(params)

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        // images,
      },
    })
    // console.log(product)

    revalidatePath(path)

    return product
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function uploadImagesAction(params: File) {
  try {
    console.log('params', params)
    // const currentUser = await getCurrentUser()
    // if (!currentUser || currentUser.role !== 'ADMIN') return

    // const file = params

    // console.log('file', file)
    // if (!file) return
    // const type = encodeURIComponent(file.type)

    // console.log('type', type)
    // const Key = `${randomUUID()}.${type}`
    // const s3Params = {
    //   Bucket: process.env.LIARA_BUCKET_NAME,
    //   Key,
    //   Expires: 60,
    //   ContentType: `image/${type}`,
    // }

    // console.log('Key', Key)
    // const uploadUrl = await s3.getSignedUrl('putObject', s3Params)

    // console.log('uploadUrl', uploadUrl)
    // return uploadUrl
  } catch (error) {
    console.log(error)
    throw error
  }
}
