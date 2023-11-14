import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { FC } from 'react'

interface StatusProps {
  text: string
  icon: LucideIcon
  bg: string
  color: string
}

const Status: FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={cn(
        bg,
        color,
        `py-2 rounded flex justify-evenly items-center gap-1 px-2`
      )}
    >
      {text} <Icon size={15} />{' '}
    </div>
  )
}

export default Status
