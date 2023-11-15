'use client'
import { toggleDeliveryAction } from '@/actions/order.action'
import {
  deleteProductAction,
  toggleStockAction,
} from '@/actions/product.actions'
import Status from '@/components/Status'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { formatTimeToNow } from '@/lib/date-utils'
import { formatPrice } from '@/lib/utils'
import { Order } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import {
  AlertTriangle,
  ArchiveRestore,
  ArrowUpDown,
  CircleDotDashedIcon,
  Eye,
  MoreHorizontal,
  PanelTopClose,
  Receipt,
  Recycle,
  Trash2,
} from 'lucide-react'

// type Order = {
//   id: number
//   amount: number
//   status: boolean | null
//   deliveryStatus: boolean | null
//   paymentIntentId: string | null
//   user_id: number | null
//   created_at: Date
//   updated_at: Date
// }
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-right">آی‌دی</div>,
  },
  {
    accessorKey: 'customer',
    header: () => <div className="text-right">خریدار</div>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className="text-right flex  ">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            مقدار
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium text-rose-400 ">
          {formatPrice.format(row.getValue('amount'))}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="text-right flex  ">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            تاریخ
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="text-right font-medium text-rose-400 ">
          {formatTimeToNow(order.created_at)}
        </div>
      )
    },
  },

  {
    accessorKey: 'paymentStatus',
    header: () => <div className="text-center">پرداخت </div>,
    cell: ({ row }) => {
      const order = row.original

      return (
        <div>
          {order.status ? (
            <Status
              text="پرداخت شده"
              icon={Receipt}
              bg="bg-teal-200"
              color="text-teal-700"
            />
          ) : (
            <Status
              icon={AlertTriangle}
              bg="bg-rose-200"
              color="text-rose-700"
              text={'پرداخت نشده'}
            />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'deliveryStatus',
    header: () => <div className="text-center">تحویل </div>,
    cell: ({ row }) => {
      const order = row.original

      return (
        <div>
          {order.deliveryStatus ? (
            <Status
              text="تحویل شده"
              icon={ArchiveRestore}
              bg="bg-teal-200"
              color="text-teal-700"
            />
          ) : (
            <Status
              icon={AlertTriangle}
              bg="bg-rose-200"
              color="text-rose-700"
              text={'تحویل نشده'}
            />
          )}
        </div>
      )
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const order = row.original

  //     const handleToggle = async () => {
  //       try {
  //         await toggleDeliveryAction({
  //           id: order.id,
  //           deliveryStatus: !order.deliveryStatus,
  //         })
  //         toast({ title: 'وضعیت محصول آپدیت شد.' })

  //         window.location.reload()
  //       } catch (error) {
  //         toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
  //       }
  //     }
  //     const handleDelete = async () => {
  //       toast({ title: 'در حال حذف محصول...' })
  //       try {
  //         const response = await axios.delete('/api/s3-upload', {
  //           data: order.id,
  //         })
  //         await deleteProductAction({
  //           id: order.id,
  //         })
  //         toast({ title: 'محصول با موفقیت حذف شد.', variant: 'destructive' })

  //         window.location.reload()
  //       } catch (error) {
  //         toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
  //       }
  //     }
  //     return (
  //       <DropdownMenu dir="rtl">
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="start">
  //           <DropdownMenuItem onClick={handleToggle}>
  //             {order.deliveryStatus ? (
  //               <Button
  //                 variant={'outline'}
  //                 className="text-rose-700 bg-rose-200 w-full flex items-center justify-center gap-2"
  //               >
  //                 تغییر به تحویل نشده
  //                 <Recycle />
  //               </Button>
  //             ) : (
  //               <Button
  //                 variant={'outline'}
  //                 className="text-teal-700 bg-teal-200 w-full flex items-center justify-center gap-2"
  //               >
  //                 تغییر به تحویل
  //                 <Recycle />
  //               </Button>
  //             )}
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Button
  //               variant={'outline'}
  //               className="w-full flex items-center justify-center gap-2"
  //               onClick={() => window.location.href === `/order/${order.id}`}
  //             >
  //               <Eye /> مشاهده
  //             </Button>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Button
  //               onClick={() => {}}
  //               className="w-full flex items-center justify-center bg-rose-400 gap-2"
  //             >
  //               <Trash2 /> حذف
  //             </Button>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
