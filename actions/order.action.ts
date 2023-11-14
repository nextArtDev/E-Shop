'use server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './getCurrentUser'

export async function toggleDeliveryAction(params: {
  id: number
  deliveryStatus: boolean
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') return

    const { id, deliveryStatus } = params

    const order = await prisma.order.update({
      where: { id },
      data: { deliveryStatus },
    })
    // return uploadUrl
  } catch (error) {
    console.log(error)
    throw error
  }
}
// export async function deleteProductAction(params: { id: number }) {
//   try {
//     const currentUser = await getCurrentUser()
//     if (!currentUser || currentUser.role !== 'ADMIN') return

//     const { id } = params

//     const product = await prisma.product.delete({
//       where: { id },
//     })
//     // return uploadUrl
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
