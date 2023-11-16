import React from 'react'
import ProductDetails from './components/ProductDetails'
import Container from '@/components/shared/Container'
import getProductById from '@/actions/getProductById'

type Props = {
  productId?: string
}

const page = async ({ params }: { params: Props }) => {
  if (!params.productId) return
  const product = await getProductById({ productId: +params.productId })
  if (!product) return
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  )
}

export default page
