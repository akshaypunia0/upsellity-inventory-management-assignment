import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '@/api/productApi';
import StockBadge from '@/component/products/StockBadge';
import Loader from '@/component/common/Loader';
import ProductForm from '@/component/products/ProductForm';

const ProductDetails = () => {
  const { id } = useParams();

  console.log(id);

  const [productData, setproductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)

  const fetchProductData = async () => {
    try {

      const data = await getProductById(id);
      setproductData(data.product);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching product details:', error);

    }
  }

  useEffect(() => {
    fetchProductData();
  }, [])

  console.log(productData);

  if (loading) return <Loader />;


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-2xl rounded-2xl border bg-background p-10 shadow-lg space-y-4">

          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {productData.name}
            </h2>

            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              {StockBadge(productData.stock, productData.minStock)}
            </span>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-4 text-base">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-lg">SKU</span>
              <span className="font-semibold text-lg">{productData.sku}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground text-lg">Price</span>
              <span className="font-bold text-xl">₹ {productData.price}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground text-lg">Available Stock</span>
              <span className="font-semibold text-lg">
                {productData.stock} units
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground text-lg">Minimum Stock</span>
              <span className="font-semibold text-lg">
                {productData.minStock} units
              </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex justify-end">
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Update Product
            </button>
          </div>

        </div>
      </div>

      <ProductForm open={open} setOpen={setOpen} mode='update' initialData={productData} />
    </>

  )
}

export default ProductDetails