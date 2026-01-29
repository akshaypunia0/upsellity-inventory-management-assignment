import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import ProductForm from '../products/ProductForm'

const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="border-b bg-gray-200">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <h1 className="text-lg font-bold">Inventory Dashboard</h1>

                    <div className="flex gap-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "font-semibold text-blue-800" : "text-black"
                            }
                        >
                            Products
                        </NavLink>

                        <NavLink
                            to="/analytics"
                            className={({ isActive }) =>
                                isActive ? "font-semibold text-blue-800" : "text-black"
                            }
                        >
                            Analytics
                        </NavLink>

                        <Button
                            onClick={() => setOpen(true)}
                            variant='outline'
                        >
                            Add Product
                        </Button>


                    </div>
                </div>
            </nav>
            <ProductForm open={open} setOpen={setOpen} />
        </>

    );
}

export default Navbar