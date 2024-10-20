const { PrismaClient } = require('@prisma/client');
const { skip } = require('@prisma/client/runtime/library');

const { convert } = require('../Utils/queryParamUtils');

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    const { page, pageSize } = convert(req.query);

    const offset = (page - 1) * pageSize;
    console.log(pageSize);

    try {
        const products = await prisma.product.findMany({
            skip: parseInt(offset),
            take: parseInt(pageSize),
            include: { category: true }
        });

        const categories = await prisma.category.findMany();

        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);
        let obj = {
            products: products,
            pagination: {
                current: page,
                totalPages: totalPages
            }
        };
        res.send(obj);
        // res.render('product', { products, page, totalPages, categories });
    } catch (error) {
        res.status(500).send('Error retrieving products');
    }
};

const getOneProduct = async (req, res) => {
    const { id } = req.query;

    try {
        const data = await prisma.product.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        console.log(data);
        const category = await prisma.Category.findFirst({
            where: {
                id: parseInt(data.categoryId)
            }
        });
        console.log(category);
        let obj = {
            product: data,
            category: category
        };
        res.send(obj);
    } catch (error) {
        console.log('single product crash');
    }
};

const addProduct = async (req, res) => {
    console.log(req.body);
    const { name, categoryId } = req.query;
    // const { name, categoryId } = req.body;

    try {
        await prisma.product.create({
            data: {
                name,
                categoryId: parseInt(categoryId)
            }
        });

        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Error retrive from Products controller........');
    }
};

const editProduct = async (req, res) => {
    const { id } = req.query;

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        const categories = await prisma.category.findMany();
        res.render('editProduct', { product, categories });
    } catch (error) {
        console.log(error);
        console.log('error in edit product ..');
    }
};

const updateProduct = async (req, res) => {
    console.log('hitted');
    const { productId, productName, categoryId } = req.query;
    // const { productId, productName, categoryId } = req.body;
    try {
        let x = await prisma.product.update({
            where: {
                id: parseInt(productId)
            },
            data: {
                name: productName,
                categoryId: parseInt(categoryId)
            }
        });
        console.log(x);
        res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(500);
    }

    //res.redirect('/products');
};

const deleteProduct = async (req, res) => {
    const { id } = req.query;

    // const { id } = req.body;
    console.log(req.body);

    try {
        await prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        }),
            res.status(201).send();
        // res.redirect('/products');
    } catch (error) {
        console.log('product delete error.......');
    }
};

module.exports = {
    getProducts,
    getOneProduct,
    addProduct,
    editProduct,
    updateProduct,
    deleteProduct
};
