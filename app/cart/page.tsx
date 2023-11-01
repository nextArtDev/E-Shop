import React from 'react'
import CartClient from './components/CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()
  console.log('user', currentUser?.name)
  console.log('phone', currentUser?.phone)
  console.log('updatedAt', currentUser?.updatedAt)
  console.log('isVerified', currentUser?.isVerified)
  console.log('role', currentUser?.role)
  return (
    <div>
      <CartClient />
    </div>
  )
}

export default page
