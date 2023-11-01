'use client'
import Avatar from '@/app/product/[productId]/components/Avatar'
import {
  ChevronDown,
  LucideLogIn,
  LucideLogOut,
  User,
  UserCog2,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
type Props = {}

const UserMenu = (props: Props) => {
  const [isOpe, setIsOpen] = useState(false)

  const { data: session, status, update } = useSession()
  const user = session?.user

  return (
    <div className="w-fit relative z-30">
      <div className="m-1 p-1 border border-slate-600 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 ">
        {/* <Avatar /> */}

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger>
            <div className="flex justify-center items-center gap-1 p-0.5">
              <UserCog2 className="text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="pr-3">
              {user ? (
                user.name
              ) : (
                <Link
                  href={'/sign-up'}
                  className="flex justify-center items-center"
                >
                  عضویت
                </Link>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {user ? (
                <div
                  onClick={() => signOut()}
                  className="flex  justify-center items-center gap-1 "
                >
                  <LucideLogOut />
                  خروج
                </div>
              ) : (
                <Link
                  href={'/sign-in'}
                  className="flex justify-center items-center"
                >
                  ورود
                </Link>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default UserMenu
