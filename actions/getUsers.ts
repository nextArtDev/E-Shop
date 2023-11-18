import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './getCurrentUser'

export interface IProductParams {
  category?: string | null
  searchTerm?: string | null
}

export async function getUsers() {
  const currentUser = await getCurrentUser()

  if (!currentUser) return
  if (currentUser.role !== 'ADMIN') return

  try {
    const users = await prisma.user.findMany({})

    return users
  } catch (error: any) {
    throw new Error(error)
  }
}
