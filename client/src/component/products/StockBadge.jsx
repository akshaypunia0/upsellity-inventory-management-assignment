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
            <Badge className="bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:text-yellow-300">
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