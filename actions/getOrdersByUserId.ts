import { prisma } from '@/lib/prisma'

type IOrderParams = {
  userId?: number
}
export async function getOrderByUserId(params: IOrderParams) {
  try {
    const { userId } = params
    if (!userId) return

    const orders = await prisma.order.findMany({
      where: {
        user_id: +userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    if (!orders) return

    return orders
  } catch (error: any) {
    throw new Error(error)
  }
}
