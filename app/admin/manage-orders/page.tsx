import { getCurrentUser } from '@/actions/getCurrentUser'

import React from 'react'

import NullData from '@/components/NullData'
import { DataTableOrders } from './DataTableOrders'
import { columns } from './column'
import { getOrders } from '@/actions/getOrders'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()

  // console.log(currentUser?.role)
  const orders = await getOrders({})

  if (!currentUser || currentUser.role !== 'ADMIN')
    return <NullData title="اجازه دسترسی ندارید!" />

  return (
    <div className="pt-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-center pb-4">
        مدیریت محصولات
      </h1>
      <DataTableOrders data={orders} columns={columns} />
    </div>
  )
}

export default page
