import { prisma } from "../config/db.js";


const addProduct = async (req, res) => {
    try {

        const { name, sku, price, stock, minStock } = req.body;

        if (!name || !sku || (price == null || undefined) || (stock == null || undefined) || (minStock == null || undefined)) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await prisma.product.create({
            data: {
                name,
                sku,
                price: Number(price),
                stock: Number(stock),
                minStock: Number(minStock)
            }
        });
        return res.status(201).json({message: 'Product added successfully', product});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while adding product' });
    }
}


const getAllProducts = async (req, res) => {
    try {

        const {
            search = '',
            status,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        let products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { sku: { contains: search, mode: 'insensitive' } }
                ]
            },
            orderBy: {
                [sortBy]: order
            }
        });

        if (status) {
            products = products.filter(product => {
                if (status === 'OUT_OF_STOCK') {
                    return product.stock === 0;
                }
                if (status === 'LOW_STOCK') {
                    return product.stock > 0 && product.stock <= product.minStock;
                }
                if (status === 'IN_STOCK') {
                    return product.stock > product.minStock;
                }
                return true;
            });
        }


        return res.status(200).json({
            message: 'Products fetched successfully',
            total: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while fetching all products' });
    }
}


const getProductById = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        return res.status(200).json({message: 'Product fetched successfully', product});


    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while fetching product by ID' });
    }
}


const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        
        const { name, sku, price, stock, minStock } = req.body;

        if (name === '' || sku === '' || (price == null || undefined) || (stock == null || undefined) || (minStock == null || undefined)) {
            return res.status(400).json({ message: 'Please provide valid values for all fields' });
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                sku,
                price,
                stock,
                minStock
            }
        });

        return res.status(200).json({message: 'Product updated successfully', product});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while updating product' });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: { id }
        });
        return res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        return
    }
}





export {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
};