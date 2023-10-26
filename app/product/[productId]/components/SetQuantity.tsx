'use client'
import { Button } from '@/components/ui/button'
import { CardProductType } from '@/types/product'
import { FC } from 'react'

interface SetQuantityProps {
  cardCounter?: boolean
  cardProduct: CardProductType
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}

const SetQuantity: FC<SetQuantityProps> = ({
  cardCounter,
  cardProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cardCounter ? null : <div className="font-semibold">تعداد:</div>}
      <div className="flex gap-4 items-center text-base">
        <Button
          variant={'outline'}
          size={'sm'}
          className="px-2 rounded text-xl"
          onClick={handleQtyDecrease}
        >
          -
        </Button>
        <span>{cardProduct.quantity}</span>
        <Button
          variant={'outline'}
          size={'sm'}
          className="px-2 rounded text-xl"
          onClick={handleQtyIncrease}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default SetQuantity
