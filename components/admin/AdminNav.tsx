'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import AdminNavItem from './AdminNavItem'
import {
  BringToFront,
  GanttChartSquare,
  LayoutDashboard,
  PackagePlus,
} from 'lucide-react'

interface AdminNavProps {}

const AdminNav: FC<AdminNavProps> = ({}) => {
  const pathname = usePathname()
  return (
    <div className="w-full shadow-sm top-20 border-b pt-4 ">
      <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap ">
        <Link href={'/admin'}>
          <AdminNavItem
            label="خلاصه"
            icon={LayoutDashboard}
            selected={pathname === '/admin'}
          />
        </Link>
        <Link href={'/admin/add-products'}>
          <AdminNavItem
            label="افزودن محصولات"
            icon={PackagePlus}
            selected={pathname === '/admin/add-products'}
          />
        </Link>
        <Link href={'/admin/manage-products'}>
          <AdminNavItem
            label="مدیریت محصولات"
            icon={GanttChartSquare}
            selected={pathname === '/admin/manage-products'}
          />
        </Link>
        <Link href={'/admin/manage-orders'}>
          <AdminNavItem
            label="مدیریت سفارشات"
            icon={BringToFront}
            selected={pathname === '/admin/manage-orders'}
          />
        </Link>
      </div>
    </div>
  )
}

export default AdminNav
