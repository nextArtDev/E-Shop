import { prisma } from '@/lib/prisma'

interface IParams {
  productId?: number
}

export default async function getProductById(params: IParams) {
  const { productId } = params
  if (!productId) return
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        },
        images: true,
      },
    })
    if (!product) return

    return product
  } catch (error: any) {
    throw new Error(error)
  }
}
