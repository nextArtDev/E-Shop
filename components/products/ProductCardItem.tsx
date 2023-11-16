import { formatPrice } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/20/solid'
import NextImage from 'next/image'
import Link from 'next/link'
import { Rating } from '@mui/material'
import { IProductParams } from '@/actions/getProducts'
import { Image, Product, Review } from '@prisma/client'

// const products = [
//   {
//     id: 1,
//     name: 'Organize Basic Set (Walnut)',
//     price: '14000',
//     rating: 5,
//     reviewCount: 38,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
//     imageAlt: 'TODO',
//     href: '#',
//   },
//   {
//     id: 2,
//     name: 'Organize Pen Holder',
//     price: '15000',
//     rating: 4.5,
//     reviewCount: 18,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
//     imageAlt: 'TODO',
//     href: '#',
//   },
//   {
//     id: 3,
//     name: 'Organize Sticky Note Holder',
//     price: '15000',
//     rating: 3,
//     reviewCount: 14,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
//     imageAlt: 'TODO',
//     href: '#',
//   },
//   {
//     id: 4,
//     name: 'Organize Phone Holder ',
//     price: '15000',
//     rating: 4,
//     reviewCount: 21,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
//     imageAlt: 'TODO',
//     href: '#',
//   },
//   // More products...
// ]
interface ExtendedProducts {
  products: (Product & {
    images: Image[]
  } & {
    reviews: Review[]
  })[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const calculateAverageRating = (reviews: Review[]): number => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  const averageRating = totalRating / reviews.length
  return averageRating
}

export default function ProductCardItem({ products }: ExtendedProducts) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const averageRating = calculateAverageRating(product?.reviews)
            return (
              <div
                key={product.id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <NextImage
                    fill
                    src={product.images[1].url}
                    alt={product.images[1].url}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900 truncate ">
                    <Link href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0  " />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    {/* <p className="sr-only">{product.reviews} out of 5 stars</p> */}
                    <div dir="ltr" className="flex items-center">
                      <p dir="rtl" className="mt-1 pr-1 text-xs text-gray-500">
                        {product.reviews.length} نظر
                        {/* {`(${product.reviewCount} نظر)`} */}
                      </p>
                      {/* {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))} */}
                      {/* MUI Rating  */}

                      <Rating
                        value={averageRating}
                        // value={productRating(product)}
                        readOnly
                        precision={0.5}
                        defaultValue={5}
                        icon={
                          <StarIcon
                            fontSize="inherit"
                            className={classNames(
                              'text-yellow-400 h-5 w-5 flex-shrink-0'
                            )}
                          />
                        }
                        emptyIcon={
                          <StarIcon
                            fontSize="inherit"
                            className="text-gray-200 h-5 w-5 flex-shrink-0"
                          />
                        }
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {formatPrice.format(+product.price)} تومان
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
