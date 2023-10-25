import React from 'react'
import ProductDetails from './components/ProductDetails'
import Container from '@/components/shared/Container'

type Props = {
  productId?: string
}

const page = ({ params }: { params: Props }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails />
      </Container>
    </div>
  )
}

export default page
