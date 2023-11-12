'use client'
import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@prisma/client'
import { formatPrice } from '@/lib/utils'
import {
  ArrowUpDown,
  CircleDotDashedIcon,
  Eye,
  MoreHorizontal,
  PanelTopClose,
  Recycle,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import Status from '@/components/Status'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { toggleStockAction } from '@/actions/product.actions'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-right">آی‌دی</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-right">نام</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className="text-right flex  ">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            قیمت
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium text-rose-400 ">
          {formatPrice.format(row.getValue('price'))}
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-right">دسته‌بندی</div>,
  },
  {
    accessorKey: 'brand',
    header: () => <div className="text-right">برند</div>,
  },
  {
    accessorKey: 'inStock',
    header: () => <div className="text-center">وضعیت </div>,
    cell: ({ row }) => {
      const product = row.original

      return (
        <div>
          {product.inStock ? (
            <Status
              text="موجود"
              icon={CircleDotDashedIcon}
              bg="bg-teal-200"
              color="text-teal-700"
            />
          ) : (
            <Status
              icon={PanelTopClose}
              bg="bg-rose-200"
              color="text-rose-700"
              text={'ناموجود'}
            />
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      const handleToggle = async () => {
        try {
          await toggleStockAction({
            id: product.id,
            inStock: !product.inStock,
          })
          toast({ title: 'وضعیت محصول آپدیت شد.' })

          window.location.reload()
        } catch (error) {
          toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
        }
      }
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleToggle}>
              {product.inStock ? (
                <Button
                  variant={'outline'}
                  className="text-rose-700 bg-rose-200 w-full flex items-center justify-center gap-2"
                >
                  تغییر به ناموجود
                  <Recycle />
                </Button>
              ) : (
                <Button
                  variant={'outline'}
                  className="text-teal-700 bg-teal-200 w-full flex items-center justify-center gap-2"
                >
                  تغییر به موجود
                  <Recycle />
                </Button>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant={'outline'}
                className="w-full flex items-center justify-center gap-2"
              >
                <Eye /> مشاهده
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full flex items-center justify-center bg-rose-400 gap-2">
                <Trash2 /> حذف
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
]
