import { getCurrentUser } from '@/actions/getCurrentUser'

import React from 'react'

import { getProducts } from '@/actions/getProducts'
import NullData from '@/components/NullData'
import { DataTable } from './table-component/DataTable'
import { columns } from './table-component/column'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()

  // console.log(currentUser?.role)
  const products = await getProducts({ category: null })
  if (!currentUser || currentUser.role !== 'ADMIN')
    return <NullData title="اجازه دسترسی ندارید!" />
  return (
    <div className="pt-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-center pb-4">
        مدیریت محصولات
      </h1>
      <DataTable data={products} columns={columns} />
    </div>
  )
}

export default page
