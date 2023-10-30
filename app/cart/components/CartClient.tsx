'use client'
import SetQuantity from '@/app/product/[productId]/components/SetQuantity'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import { ArrowBigLeft, ArrowLeft, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { removeItem } from '@/redux/slices/cardSlice'
import { useEffect } from 'react'

const products = [
  {
    id: 1,
    name: 'Artwork Tee',
    href: '#',
    price: '320000',
    color: 'Mint',
    size: 'Medium',
    inStock: true,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg',
    imageAlt: 'Front side of mint cotton t-shirt with wavey lines pattern.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '840000',
    color: 'Charcoal',
    inStock: false,
    leadTime: '7-8 years',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'Front side of charcoal cotton t-shirt.',
  },
  // More products...
]

export default function CartClient() {
  // const dispatch = useDispatch<AppDispatch>()
  // const items = useAppSelector((state) => state.cardReducer)
  // console.log(items)

  // NOT NEEDED (Because of reducers and redux and its for react-context)
  // const handleQtyIncrease = useCallback(
  //   (product) => {
  //     let updatedCart
  //     if (cartProduct) {
  //       updatedCart = [...cartProduct]
  //     }
  //     const existingIndex = cardProducts.findIndex(
  //       (item) => item.id === product.id
  //     )
  //     if (existingIndex > -1) {
  //       updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
  //         .quantity
  //     }
  //     setCartProduct(updatedCart)
  //   },
  //   [product]
  // )

  // const handleQtyDecrease = useCallback(
  //   (product) => {
  //     let updatedCart
  // if(products.quantity ===1)return
  //     if (cartProduct) {
  //       updatedCart = [...cartProduct]
  //     }
  //     const existingIndex = cardProducts.findIndex(
  //       (item) => item.id === product.id
  //     )
  //     if (existingIndex > -1) {
  //       updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
  //         .quantity
  //     }
  //     setCartProduct(updatedCart)
  //   },
  //   [product]
  // )

  // TOTAL
  //Former
  // const totalPrice = items.reduce((total, item) => {
  //   return total + Number(item.price)
  // }, 0)

  //new (It have to Be in summary page)

  // useEffect(() => {
  //   if (products) {
  //     const [total, qty] = products?.reduce(
  //       (acc, item) => {
  //         const itemTotal = item.price * item.quantity

  //         acc.total += itemTotal
  //         acc.qty += item.quantity

  //         return acc
  //       },
  //       {
  //         total: 0,
  //         qty: 0,
  //       }
  //     )

  // If we dont use it immediatly
  // setCartTotal(qty)
  // setCartTotalAmount(total)
  //   }
  // }, [products])

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center py-8">
        <div className="text-2xl">سبد خرید شما خالیست</div>
        <div>
          <Link
            href={'/'}
            className="flex items-center py-2 px-4 gap-2 my-4 border rounded-md text-green-400 "
          >
            <span className="">شروع خرید</span>
            <ArrowLeft />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          سبد خرید
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {products.length > 0 &&
                products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="relative flex-shrink-0 h-24 w-24">
                      <Image
                        fill
                        // width={96}
                        // height={96}
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="absolute rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="mr-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between ">
                          <h4 className="text-sm truncate">
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800  "
                            >
                              {product.name}
                            </Link>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {formatPrice.format(+product.price)} تومان
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.size}
                        </p>
                        <div className="mt-2">
                          {/* <SetQuantity
                            cardCounter
                            // cardProduct={product}
                            // handleQtyIncrease={dispatch(quantityIncrease(item))}
                            // handleQtyDecrease={dispatch((quantityDecrease(item))}
                          /> */}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {product.inStock
                              ? 'In stock'
                              : `Will ship in ${product.leadTime}`}
                          </span>
                        </p>
                        <div className="ml-4">
                          <Button
                            variant={'outline'}
                            onClick={() => {}}
                            className="border border-indigo-200 text-sm font-medium text-indigo-300 hover:text-indigo-500"
                          >
                            <Trash size={'small'} />
                            {/* <span className="">حذف</span> */}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">مجموع</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    {formatPrice.format(1160000)} تومان
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                تسویه حساب
              </button>
            </div>
            <div className="flex flex-col mt-6 text-center text-sm">
              <div className="relative">
                <p className="absolute top-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] font-bold  bg-white">
                  یا
                </p>
                <Separator className="" />
              </div>
              <Link
                href="#"
                className="my-8 px-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                <Button
                  className="flex w-full gap-x-2 font-semibold "
                  variant={'outline'}
                >
                  ادامه خرید
                  <span aria-hidden="true"> &larr;</span>
                </Button>
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
