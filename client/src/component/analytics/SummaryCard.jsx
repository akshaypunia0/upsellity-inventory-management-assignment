import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SummaryCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.totalProducts}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Inventory Value</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          ₹ {data.totalInventoryValue.toLocaleString()}
        </CardContent>
      </Card>

      <Card className="border-yellow-400">
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-600">
          {data.lowStockCount}
        </CardContent>
      </Card>

      <Card className="border-red-500">
        <CardHeader>
          <CardTitle>Out of Stock</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-600">
          {data.outOfStockCount}
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCard
