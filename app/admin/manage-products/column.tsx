'use client'
import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@prisma/client'
import { formatPrice } from '@/lib/utils'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
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
    header: () => <div className="text-right">در فروش</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(product.id))
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
