import { Product } from '@prisma/client'
import { FC } from 'react'
import { DataTable } from './DataTable'
import { columns } from './column'

interface ManageProductsClientProps {
  products: Product[]
}

const ManageProductsClient: FC<ManageProductsClientProps> = ({ products }) => {
  return (
    <div>
      {/* <DataTable products={products} /> */}
      <DataTable data={products} columns={columns} />
    </div>
  )
}

export default ManageProductsClient
