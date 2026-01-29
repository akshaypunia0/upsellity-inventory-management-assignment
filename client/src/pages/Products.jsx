import React, { useEffect, useState } from 'react'
import { getAllProducts } from '@/api/productApi'
import ProductTable from '@/component/products/ProductTable'
import { deleteProduct } from '@/api/productApi'
import ConfirmDialog from '@/component/common/ConfirmDialog'
import Loader from '@/component/common/Loader'
import SearchBar from '@/component/layout/SearchBar'
import DropdownFilter from '@/component/layout/DropdownFilter'


const Products = () => {

  const status = ['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'];
  const price = ['asc', 'desc'];

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priceFilter, setPriceFilter] = useState('desc');

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetAllProducts = async () => {
    setLoading(true)
    const data = await getAllProducts({ search, status: statusFilter, price: priceFilter });

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

  const onSearch = () => {
    fetAllProducts()
  }


  useEffect(() => {
    fetAllProducts()
  }, [statusFilter, priceFilter]);

  if (loading) return <Loader />;

  return (
    <>
      <div className='flex flex-col max-w-7xl mx-auto'>
        <div className='flex justify-start items-center my-4'>
          <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
          <div className="flex justify-start items-center my-4 gap-12">
            <DropdownFilter status={statusFilter} menu={status} onSelect={setStatusFilter} label="Status" />
            <DropdownFilter status={priceFilter} menu={price} onSelect={setPriceFilter} label="Price" />
          </div>
        </div>
        <ProductTable products={allProducts} onDelete={handleDeleteClick} />
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={handleConfirmDelete} />
      </div>
    </>
  )
}

export default Products