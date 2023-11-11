import { prisma } from '@/lib/prisma'

export interface IProductParams {
  category?: string | null
  searchTerm?: string | null
}

export async function getOrders(params: IProductParams) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return orders
  } catch (error: any) {
    throw new Error(error)
  }
}
