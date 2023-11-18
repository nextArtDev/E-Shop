import React from 'react'
import Summary from './manage-products/Summary'
import { getProducts } from '@/actions/getProducts'
import { getUsers } from '@/actions/getUsers'
import { getOrders } from '@/actions/getOrders'

type Props = {}

const page = async (props: Props) => {
  const orders = getOrders({})
  const products = await getProducts({ category: null })
  const users = await getUsers()
  return (
    <div className="pt-8">
      <Summary orders={orders} products={products} users={users} />
    </div>
  )
}

export default page
