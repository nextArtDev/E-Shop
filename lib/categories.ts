import {
  Laptop,
  MonitorCheck,
  Mouse,
  ShoppingCart,
  TabletSmartphone,
  Watch,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface CategoryType {
  label: string
  icon: LucideIcon
}
export const categories: CategoryType[] = [
  {
    label: 'همه',
    icon: ShoppingCart,
  },
  {
    label: 'موبایل',
    icon: TabletSmartphone,
  },
  {
    label: 'لپتاپ',
    icon: Laptop,
  },
  {
    label: 'کامپیوتر',
    icon: MonitorCheck,
  },
  {
    label: 'ساعت',
    icon: Watch,
  },
  {
    label: 'لوازم جانبی',
    icon: Mouse,
  },
]
