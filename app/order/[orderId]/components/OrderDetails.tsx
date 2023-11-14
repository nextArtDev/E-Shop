import Status from '@/components/Status'
import { formatTimeToNow } from '@/lib/date-utils'
import { formatPrice } from '@/lib/utils'
import { Order, User } from '@prisma/client'
import { AlertTriangle, ArchiveRestore, Receipt, Timer } from 'lucide-react'
import OrderItem from './OrderItem'

const orders = [
  {
    id: 1,
    name: 'لیوان آبخوری',
    description:
      'This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.',
    href: '#',
    quantity: 1,
    price: '32.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-05-order?-01.jpg',
    imageAlt: 'Glass bottle with black plastic pour top and mesh insert.',
  },
]

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">سپاسگذاریم!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">در راه است!</p>
          <p className="mt-2 text-base text-gray-500">
            شما به شماره #1232456546 ارسال شده و به زودی به شما تحویل داده خواهد
            شد.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">شماره پیگیری</dt>
            <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
          </dl>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-t border-gray-200"
        >
          <h2 id="order-heading" className="sr-only">
            سفارش شما
          </h2>

          <h3 className="sr-only">Items</h3>

          <div
            key={order?.id}
            className="flex gap-x-6 border-b border-gray-200 py-10"
          >
            <img
              src={order?.imageSrc}
              alt={order?.imageAlt}
              className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
            />
            <div className="flex flex-auto flex-col">
              <div>
                <h4 className="font-medium text-gray-900">
                  <a href={order?.href}>{order?.name}</a>
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  {order?.description}
                </p>
              </div>
              <div className="mt-6 flex flex-1 items-end">
                <dl className="flex gap-x-4 divide-x divide-gray-200 text-sm sm:gap-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">تعداد</dt>
                    <dd className="mr-2 text-gray-700">{order?.quantity}</dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900">قیمت</dt>
                    <dd className="mr-2 text-gray-700">{order?.price}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* Start Our Tutorial order Page  */}
          <div className="mx-auto flex flex-col gap-2">
            <div>شماره سفارش: {order?.id}</div>
            <div>
              مجموع خرید:
              <span className="font-bold">
                {' '}
                {formatPrice.format(order?.amount)}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <div>وضعیت پرداخت:</div>
              <div>
                {!order.status ? (
                  <Status
                    text="پرداخت نشده"
                    icon={Timer}
                    bg="bg-yellow-100"
                    color="bg-yellow-500"
                  />
                ) : (
                  <Status
                    text="پرداخت شده"
                    icon={Receipt}
                    bg="bg-green-100"
                    color="bg-green-400"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div>وضعیت تحویل:</div>
              <div>
                {!order.deliveryStatus ? (
                  <Status
                    text="تحویل نشده"
                    icon={AlertTriangle}
                    bg="bg-yellow-100"
                    color="bg-yellow-400"
                  />
                ) : (
                  <Status
                    text="تحویل شده"
                    icon={ArchiveRestore}
                    bg="bg-green-100"
                    color="bg-green-400"
                  />
                )}
              </div>
            </div>
            <div> {formatTimeToNow(order.created_at)}</div>
            <div>
              <h2 className="font-semibold mt-4 mb-2">
                محصولات سفارش داده شده:
              </h2>
              <div className="grid grid-cols 5 text-xs gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start ">محصول</div>
                <div className="justify-self-center ">قیمت</div>
                <div className="justify-self-center ">تعداد</div>
                <div className="justify-self-center ">مجموع</div>
              </div>
              {order.products &&
                order.products.map((item) => {
                  return <OrderItem key={item.id} item={item} />
                })}
            </div>
          </div>
          {/* End Our Tutorial order Page  */}

          <div className="sm:mr-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">آدرس</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">آدرس ارسالی</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">Kristin Watson</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">آدرس قبض</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">Kristin Watson</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">روش پرداخت</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">خلاصه</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">مجموع سفارش</dt>
                <dd className="text-gray-700">125000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex font-medium text-gray-900">
                  تخفیف
                  <span className="mr-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                    کدتخفیف
                  </span>
                </dt>
                <dd className="text-gray-700">-$18.00 (50%)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">$5.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">مبلغ قابل پرداخت</dt>
                <dd className="text-gray-900">$23.00</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  )
}
