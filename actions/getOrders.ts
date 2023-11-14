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

type IOrderParams = {
  orderId?: string
}
export async function getOrderById(params: IOrderParams) {
  try {
    const { orderId } = params
    if (!orderId) return

    const order = await prisma.order.findUnique({
      where: {
        id: +orderId,
      },
      include: {
        user: true,
      },
    })

    if (!order) return

    return order
  } catch (error: any) {
    throw new Error(error)
  }
}
