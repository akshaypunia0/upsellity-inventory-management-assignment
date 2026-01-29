import React, { useEffect, useState } from 'react'
import { getAllProducts } from '@/api/productApi'
import ProductTable from '@/component/products/ProductTable'
import { deleteProduct } from '@/api/productApi'
import ConfirmDialog from '@/component/common/ConfirmDialog'
import Loader from '@/component/common/Loader'


const Products = () => {

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetAllProducts = async () => {
    setLoading(true)
    const data = await getAllProducts()

    setAllProducts(data.products)
    setLoading(false);

  }

  const handleDeleteClick = (id) => {
    console.log('handleDeleteClick delete id: ', id);
    setOpen(true);
    setDeleteId(id);
  }

  const handleConfirmDelete = async () => {
    console.log('handleConfirmDelete delete id: ', deleteId);
    
    await deleteProduct(deleteId);
    setOpen(false);
    setDeleteId(null);
    fetAllProducts();
  }


  useEffect(() => {
    fetAllProducts()
  }, [])

  if(loading) return <Loader />;

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <ProductTable products={allProducts} onDelete={handleDeleteClick} />
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={handleConfirmDelete} />
      </div>
    </>
  )
}

export default Products