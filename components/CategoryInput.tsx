'use client'
import { LucideIcon } from 'lucide-react'
import { FC } from 'react'

interface CategoryInputProps {
  selected?: boolean
  label: string
  icon: LucideIcon
  onClick: (value: string) => void
}

const CategoryInput: FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl  p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
        selected ? 'border-b border-indigo-600' : 'border-slate-200'
      }`}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  )
}

export default CategoryInput
