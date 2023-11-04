import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'ADMIN')
    return <NullData title="اجازه دسترسی ندارید!" />

  return <div>page</div>
}

export default page
