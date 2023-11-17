import React from 'react'
import ProductDetails from './components/ProductDetails'
import Container from '@/components/shared/Container'
import getProductById from '@/actions/getProductById'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { prisma } from '@/lib/prisma'

type Props = {
  productId?: string
}

const page = async ({ params }: { params: Props }) => {
  const currentUser = await getCurrentUser()

  if (!params.productId) return

  const product = await getProductById({ productId: +params.productId })

  if (!product) return

  const beforeRated = await prisma.review.findFirst({
    where: {
      user_id: currentUser?.id,
      productId: +product.id,
    },
    select: {
      rating: true,
    },
  })

  return (
    <div className="p-8">
      <Container>
        <ProductDetails
          product={product}
          currentUser={currentUser}
          beforeRated={beforeRated}
        />
      </Container>
    </div>
  )
}

export default page
