import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { addProduct } from "@/api/productApi"

const ProductForm = ({ open, setOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        stock: "",
        minStock: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.price) {
            alert("Name and Price are required")
            return
        }

        setOpen(false)

        await addProduct(formData)
        window.location.reload()

        setFormData({
            name: "",
            sku: "",
            price: "",
            stock: "",
            minStock: ""
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <Label>Product Title</Label>
                        <Input
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>SKU</Label>
                        <Input
                            name="sku"
                            placeholder="Enter SKU"
                            value={formData.sku}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Stock</Label>
                        <Input
                            type="number"
                            name="stock"
                            placeholder="Enter stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Minimum Stock</Label>
                        <Input
                            type="number"
                            name="minStock"
                            placeholder="Enter minimum stock"
                            value={formData.minStock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            Add Product
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductForm
