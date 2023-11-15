import { IProductParams } from '@/actions/getOrders'
import { getProducts } from '@/actions/getProducts'
import NullData from '@/components/NullData'
import PromoBanner from '@/components/PromoBanner'
import ProductCard from '@/components/products/ProductCard'
import ProductCardItem from '@/components/products/ProductCardItem'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

interface HomeProps {
  searchParams: IProductParams
}
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams)
  // console.log(products)
  if (products?.length === 0) return <NullData title="هیچ محصولی وجود ندارد" />

  return (
    <section className="">
      {/* {products.map((product) => (
        <div key={product.id} className="flex">
          {product.reviews.map((review) => (
            <div key={review.id}>{review.rating}</div>
          ))}

          {product.images.map((image) => (
            <Image
              // fill
              width={320}
              height={320}
              alt="d"
              src={image.url}
              // src={URL.createObjectURL(image.url)}
              key={image.id}
              className="object-contain"
            />
          ))}
        </div>
      ))} */}
      <PromoBanner />
      {/* <ProductCard products={products} /> */}
      <ProductCardItem products={products} />
    </section>
  )
}
