


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import StockBadge from "../products/StockBadge"

const ProductStockTable = ({ products, title, color }) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className={`text-xl font-semibold mb-4 text-${color}-600`}>
        {title}
      </h2>

      {products.length === 0 ? (
        <p className={`text-${color}-600`}>No products 🎉</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Min Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell className={`text-${color}-600 font-semibold`}>
                  {p.stock}
                </TableCell>
                <TableCell>{p.minStock}</TableCell>
                <TableCell>
                  {StockBadge(p.stock, p.minStock)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default ProductStockTable
