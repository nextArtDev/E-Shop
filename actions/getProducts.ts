import { prisma } from '@/lib/prisma'

export interface IProductParams {
  category?: string | null
  searchTerm?: string | null
}

export async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params
    let searchString = searchTerm

    if (!searchTerm) searchString = ''

    let query: any = {}

    if (category) query.category = category

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
            },
            description: {
              contains: searchString,
            },
          },
        ],
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
      },
    })

    return products
  } catch (error: any) {
    throw new Error(error)
  }
}
