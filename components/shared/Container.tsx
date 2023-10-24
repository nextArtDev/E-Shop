import { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl ma-auto xl:px-20 lg:px-8 md:px-6 sm:px-4 px-2 ">
      {children}
    </div>
  )
}

export default Container
