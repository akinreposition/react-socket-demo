const asyncHandler = require('express-async-handler')

const Proudct = require('../models/productModel')
const User = require('../models/userModel')

// @desc  Get Products
// routes GET /api/products
// access Private

const getProduct = asyncHandler( async (req, res) => {
    const products = await Proudct.find()
    res.status(200).json(products)
})

// @desc  Post Product
// routes POST /api/products
// access Private

const setProduct = asyncHandler( async (req, res) => {
    if (!req.body.product) {
        res.status(400)
        throw new Error("Please add Product")
    }
    const product = await Product.create({
        product: req.body.product
    })
    res.status(201).json(product)
})

// @desc  Update Product
// routes PUT /api/products/:id
// access Private

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404)
        throw new Error("Product not found")
    }
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updateProduct)
})

// @desc  Delete Product
// routes DELETE /api/products/:id
// access Private

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        req.status(400)
        throw new Error("No Product Found!")
    }

    await product.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getProduct,
    setProduct,
    updateProduct,
    deleteProduct
}