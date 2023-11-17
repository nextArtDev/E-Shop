'use client'
import { LucideIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'
import qs from 'query-string'
interface CategoryProps {
  label: string
  icon: LucideIcon
  selected?: boolean
  className?: string
}

const Category: FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
  className,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if (label === 'همه') {
      router.push('/')
    } else {
      let currentQuery = {}

      if (params) {
        currentQuery = qs.parse(params.toString())
      }

      const updateQuery: any = {
        ...currentQuery,
        category: label,
      }
      const url = qs.stringifyUrl(
        { url: '/', query: updateQuery },
        { skipNull: true }
      )
      router.push(url)
    }
  }, [label, params, router])
  return (
    <div
      onClick={handleClick}
      className={`${className} flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium cursor-pointer ${
        selected
          ? 'border-b border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-900'
      }`}
    >
      <div className="font-medium text-sm ">{label}</div>
      <Icon size={20} />
    </div>
  )
}

export default Category
