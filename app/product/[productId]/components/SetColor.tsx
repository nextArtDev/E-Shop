'use client'
import { CardProductType, SelectedImgType } from '@/types/product'
import { FC } from 'react'

interface SetColorProps {
  images: SelectedImgType[]
  cardProduct: CardProductType
  handleColorSelect: (value: SelectedImgType) => void
}

const SetColor: FC<SetColorProps> = ({
  images,
  cardProduct,
  handleColorSelect,
}) => {
  return (
    <section>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">
          <div className="flex gap-1">
            {images.map((image) => {
              return (
                <div
                  key={image.color}
                  onClick={() => handleColorSelect(image)}
                  className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                    cardProduct.selectedImg.color === image.color
                      ? 'border-[1.5px]'
                      : 'border-none'
                  }`}
                >
                  <div
                    style={{ backgroundImage: image.colorCode }}
                    className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer "
                  ></div>
                </div>
              )
            })}
          </div>
        </span>
      </div>
    </section>
  )
}

export default SetColor
