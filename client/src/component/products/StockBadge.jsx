import { Badge } from "@/components/ui/badge"

const StockBadge = (stock, minStock) => {

    if (stock === 0) {
        return (
            <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                Out of stock
            </Badge>
        )
    }

    if (stock > 0 && stock <= minStock) {
        return (
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Low stock
            </Badge>
        )
    }

    return (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            In stock
        </Badge>
    )
}

export default StockBadge