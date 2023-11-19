import React from 'react'
import Summary from './manage-products/Summary'
import { getProducts } from '@/actions/getProducts'
import { getUsers } from '@/actions/getUsers'
import { getOrders } from '@/actions/getOrders'
import BarGraph from './BarGraph'
import getGraphData from '@/actions/getGraphData'

type Props = {}

const page = async (props: Props) => {
  const orders = getOrders({})
  const products = await getProducts({ category: null })
  const users = await getUsers()

  const graphData = await getGraphData()

  return (
    <div className="pt-8">
      <Summary orders={orders} products={products} users={users} />
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph data={graphData} />
      </div>
    </div>
  )
}

export default page
