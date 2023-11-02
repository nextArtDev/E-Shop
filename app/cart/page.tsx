import React from 'react'
import CartClient from './components/CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getPayment } from '@/lib/actions/payment.action'
import { redirect } from 'next/navigation'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()

  const payment = await getPayment()
  // console.log(res)
  console.log('URL', payment?.url)
  redirect(payment?.url)
  // console.log(res?.paymentInfo.referenceId)
  // if(res?.paymentInfo.referenceId)redirect(res?.paymentInfo.url)

  // console.log('user', currentUser?.name)
  // console.log('phone', currentUser?.phone)
  // console.log('updatedAt', currentUser?.updatedAt)
  // console.log('isVerified', currentUser?.isVerified)
  // console.log('role', currentUser?.role)
  return (
    <div>
      <CartClient />
    </div>
  )
}

export default page
