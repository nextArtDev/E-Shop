# Getting user from auth and adding db attributes

first we extend next-auth.d.ts
```typescript
declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      name: string
      //extend auth for phone
      phone: string
    }
}
```
```typescript
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user) {
      return null
    }
    console.log('user get', session?.user)

    const currentUser = await prisma.user.findUnique({
      where: {
        id: +session.user.id,
      },
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      //   verified: currentUser.isVerified,
    }
  } catch (error) {}
}
```

## Using of that 

```typescript
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
      <CartClient user={currentUser} />
    </div>
  )
}

export default page
```

## Whats the type of current user

its SafeUser | null

```typescript
// type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
// Construct a type with the properties of T except for those in type K.

export type SafeUser = Omit<User, 'createdAt', 'updatedAt', 'verified', 'role'> & {
  createdAt:string
  updatedAt:string
  verified:boolean
  role:string
}


```
