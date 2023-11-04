import { getCurrentUser } from '@/actions/getCurrentUser'
import { createProduct } from '@/actions/product.actions'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  // const product = await createProduct({})
  const currentUser = await getCurrentUser()
  console.log(currentUser?.role)
  return <div>page</div>
}

export default page
