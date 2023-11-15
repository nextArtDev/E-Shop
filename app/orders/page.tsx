import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import { FC } from 'react'
import { OrderTable } from './OrderTable'
import { getOrderByUserId } from '@/actions/getOrdersByUserId'
import { columns } from './column'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <NullData title="مجاز به دسترسی نیستید!" />
  }

  const orders = await getOrderByUserId({ userId: currentUser.id })

  if (!orders) return <NullData title="هنوز سفارشی نداشته‌اید!" />

  return <OrderTable data={orders} columns={columns} />
}

export default page
