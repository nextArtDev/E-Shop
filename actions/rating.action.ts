'use server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './getCurrentUser'
import { revalidatePath } from 'next/cache'
import { Review } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { error } from 'console'
interface IParams {
  rating: string
  comment: string
  user_id?: string
  productId?: number
  path: string
}
export async function createReviewAction(params: IParams) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return

    const { comment, rating, user_id, productId, path } = params

    // console.log(params)
    const alreadyRated = await prisma.review.findFirst({
      where: {
        productId,
        user_id: Number(user_id),
      },
    })
    if (alreadyRated) throw new Error('قبلا نظر داده اید.')
    // if (alreadyRated) throw null

    const review = await prisma.review.create({
      data: {
        comment,
        rating: +rating,
        user_id: Number(user_id),
        productId: Number(productId),
      },
    })
    // console.log(review)

    revalidatePath(path)

    return review
  } catch (error) {
    // console.log(error)
    throw new Error('لطفا بعدا امتحان کنید. مشکلی پیش آمده.')
  }
}
