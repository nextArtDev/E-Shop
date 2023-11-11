import { getCurrentUser } from '@/actions/getCurrentUser'

import React from 'react'

import { getProducts } from '@/actions/getProducts'
import NullData from '@/components/NullData'
import ManageProductsClient from './ManageProductsClient'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()

  // console.log(currentUser?.role)
  const products = await getProducts({ category: null })
  if (!currentUser || currentUser.role !== 'ADMIN')
    return <NullData title="اجازه دسترسی ندارید!" />
  return (
    <div className="pt-8">
      <ManageProductsClient products={products} />
    </div>
  )
}

export default page
