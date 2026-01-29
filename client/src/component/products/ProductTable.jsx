import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import StockBadge from "./StockBadge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"


const ProductTable = ({ products, onDelete }) => {

    console.log('Data is: ', products);

    return (
        <Table className="rounded-xl overflow-hidden border bg-background shadow-sm">
            <TableCaption className="py-4 text-sm text-muted-foreground">
                List of your current inventory
            </TableCaption>

            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-68">Name</TableHead>
                    <TableHead className="w-60">SKU</TableHead>
                    <TableHead className="w-60">Price</TableHead>
                    <TableHead className="text-left">Stock</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map((product, index) => (
                    <TableRow
                        key={product.id}
                        className="hover:bg-muted/40 transition-colors"
                    >
                        <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                        </TableCell>

                        <TableCell className="font-semibold">
                            {product.name}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                            {product.sku}
                        </TableCell>

                        <TableCell className="font-medium">
                            ₹ {product.price}
                        </TableCell>

                        <TableCell className="text-left">
                            <span className="flex gap-4">{product.stock}{StockBadge(product.stock, product.minStock)}</span>
                        </TableCell>

                        <TableCell className="text-center">
                            <div className="flex justify-end gap-2">
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="outline">
                                        View
                                    </Button>
                                </Link>
                                <Button onClick={() => onDelete(product.id)} variant="outline" className="text-red-500 hover:text-red-700">
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default ProductTable;;