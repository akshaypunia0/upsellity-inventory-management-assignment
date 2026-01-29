import { Parser } from 'json2csv';
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
        return res.status(201).json({ message: 'Product added successfully', product });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while adding product' });
    }
}


const getAllProducts = async (req, res) => {
    try {

        const {
            search = '',
            status,
            price = 'desc',
        } = req.query;

        let products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { sku: { contains: search, mode: 'insensitive' } }
                ]
            },
            orderBy: {
                price: price
            }
        });

        if (status) {
            products = products.filter(product => {
                if (status === 'ALL') {
                    return true;
                }
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


        return res.status(200).json({ message: 'Product fetched successfully', product });


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
                price: Number(price),
                stock: Number(stock),
                minStock: Number(minStock)
            }
        });

        return res.status(200).json({ message: 'Product updated successfully', product });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while updating product', error });
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


const exportInventoryCSV = async (req, res) => {
    console.log('export csv running 1');
    try {

        const products = await prisma.product.findMany();

        const csvData = products.map(product => {
            let status = 'IN_STOCK';
            if (product.stock === 0) {
                status = 'OUT_OF_STOCK';
            } else if (product.stock <= product.minStock) {
                status = 'LOW_STOCK';
            }

            return {
                name: product.name,
                sku: product.sku,
                price: product.price,
                stock: product.stock,
                status
            }
        })

        console.log('export csv running 2');

        const parser = new Parser({
            fields: ['name', 'sku', 'price', 'stock', 'status']
        });

        const csv = parser.parse(csvData);

        res.header('Content-Type', 'text/csv');

        const filename = `inventory_${Math.floor(Math.random() * 1000)}.csv`;

        res.header("Content-Disposition", `attachment; filename=${filename}`);

        console.log('export csv running 3');

        return res.status(200).send(csv);


    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error while exporting inventory CSV', error: error.message });
    }
}





export {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
    exportInventoryCSV
};