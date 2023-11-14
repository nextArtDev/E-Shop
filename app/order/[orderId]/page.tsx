import React from 'react'

import Container from '@/components/shared/Container'
import OrderDetails from './components/OrderDetails'
import { getOrderById } from '@/actions/getOrders'
import NullData from '@/components/NullData'

type Props = {
  orderId?: string
}

const page = async ({ params }: { params: Props }) => {
  const order = await getOrderById(params)
  if (!order) return <NullData title="سفارش وجود ندارد!" />

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  )
}

export default page
