import { CardProductType, SelectedImgType } from '@/types/product'
import Image from 'next/image'
import { FC } from 'react'

interface ProductImageProps {
  cardProduct: CardProductType
  product: any
  handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage: FC<ProductImageProps> = ({
  cardProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <section className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full  max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative rounded border-teal-300 ${
                cardProduct.selectedImg.color ? 'border-[1.5px]' : 'border-none'
              } `}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
      <div className="col-span-5 relative ">
        <Image
          fill
          src={cardProduct.selectedImg.image}
          alt={cardProduct.name}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h[400px] "
        />
      </div>
    </section>
  )
}

export default ProductImage
