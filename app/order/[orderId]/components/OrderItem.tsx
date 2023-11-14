import { formatPrice } from '@/lib/utils'
import { CardProductType } from '@/types/product'
import Image from 'next/image'
import { FC } from 'react'

interface OrderItemProps {
  item: CardProductType
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="gird grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center ">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 ">
        <div className="relative w-[70px] aspect-1 ">
          <Image
            src={item?.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="line-clamp-1">{item.name}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">
        {formatPrice.format(item.price)}
      </div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-center">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}

export default OrderItem
