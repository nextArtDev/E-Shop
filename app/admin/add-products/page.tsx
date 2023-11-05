import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'
import React from 'react'
import AddProductForm from './AddProductForm'
import Container from '@/components/shared/Container'

type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'ADMIN')
    return <NullData title="اجازه دسترسی ندارید!" />

  return (
    <Container>
      <AddProductForm />
    </Container>
  )
}

export default page
