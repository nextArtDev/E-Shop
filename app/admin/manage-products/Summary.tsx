'use client'
import { formatPrice } from '@/lib/utils'
import { Order, Product, User } from '@prisma/client'
import { FC, useEffect, useState } from 'react'

interface SummaryProps {
  orders: Order[]
  products: Product[]
  users: User[]
}
type SummaryDataType = {
  [key: string]: {
    label: string
    digit: number
  }
}

const Summary: FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: { label: 'همه فروش', digit: 0 },
    products: { label: 'همه محصولات', digit: 0 },
    orders: { label: 'مجموع سفارشات', digit: 0 },
    paidOrders: { label: 'مجموع پرداخت شده', digit: 0 },
    unPaidOrders: { label: 'مجموع پرداخت نشده', digit: 0 },
    users: { label: 'مجموع کاربرها', digit: 0 },
  })

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev }

      //   const totalSale = orders.reduce((acc, item) => {
      //     if (item.status) {
      //       return acc + item.amount
      //     } else return acc
      //   }, 0)

      //   const paidOrders = orders.filter((order) => {
      //     return order.status === true
      //   })
      //   const unPaidOrders = orders.filter((order) => {
      //     return order.status === false
      //   })
      //   tempData.sale.digit = totalSale
      //   tempData.paidOrders.digit = paidOrders.length
      //   tempData.unPaidOrders.digit = unPaidOrders.length
      tempData.orders.digit = orders.length
      tempData.users.digit = users.length
      tempData.products.digit = products.length

      return tempData
    })
  }, [orders, products, users])

  const summaryKeys = Object.keys(summaryData)

  return (
    <div className="max-w-[1150px] p-8 mx-auto">
      <div className="mb-4 mt-8">
        <h1 className="text-xl font-semibold">خلاصه</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto ">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-3xl font-bold ">
                  {summaryData[key].label === 'مجموع فروش' ? (
                    <>{formatPrice.format(summaryData[key].digit)}</>
                  ) : (
                    <>
                      {new Intl.NumberFormat('fa-IR').format(
                        summaryData[key].digit
                      )}
                    </>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Summary
