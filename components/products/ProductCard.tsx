import { formatPrice } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Rating, keyframes } from '@mui/material'
import { Image as ImageType, Product, Review } from '@prisma/client'

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
    image: ImageType[]
  } & {
    review: Review[]
  })[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductCard({ products }: ExtendedProducts) {
  return (
    <div className="bg-white">
      {products.map((product) => {
        const { name, brand, description, image, price, review } = product

        return (
          <div key={product.id}>
            {name}
            {/* {product.images[0]?.map((img) => ( */}
            <Image
              key={product.images[0].id}
              fill
              src={product.images[0].url}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            {/* ))} */}
            {product.reviews?.map((rev) => (
              <div key={rev.id}>
                <div>{rev.comment}</div>
                <div>{rev.rating}</div>
                {/* <div>{rev.created_at}</div> */}
              </div>
            ))}
          </div>
        )
      })}
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                {/* {product.image.length > 0 && (
                  // <img
                  //   href={product.image.url}
                  //   alt={product.name}
                  //   className="h-full w-full object-cover object-center"
                  // />
                  product.image. .url.map(img=>
                    <Image
                    key={img.}
                   fill
                   src={product.image.url}
                   alt={product.name}
                   className="h-full w-full object-cover object-center"
                 />
                 )
                )} */}
                {product.image &&
                  product.image.map((img) => (
                    <Image
                      key={img.url}
                      fill
                      src={product.image[0].url}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ))}
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900 truncate ">
                  <Link href={`/product/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0  " />
                    {product.name}
                  </Link>
                </h3>
                {product.review &&
                  product.review.map((review) => (
                    <div
                      key={review.id}
                      className="mt-3 flex flex-col items-center"
                    >
                      <p className="sr-only">{review?.rating} out of 5 stars</p>
                      <div dir="ltr" className="flex items-center">
                        <p
                          dir="rtl"
                          className="mt-1 pr-1 text-xs text-gray-500"
                        >
                          {product.review && product.review.length} نظر
                          {/* {`(${review?.length} نظر)`} */}
                        </p>
                        {review &&
                          [0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                Number(product.review.rating) > rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        {/* MUI Rating  */}
                        {review && (
                          <Rating
                            value={review.rating}
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
                        )}
                      </div>
                    </div>
                  ))}
                <p className="mt-4 text-base font-medium text-gray-900">
                  {formatPrice.format(+product.price)} تومان
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
