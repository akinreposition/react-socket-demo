const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')
const User = require('../models/userModel')

// @desc  Get Products
// route GET /api/products
// access Private

const getProduct = asyncHandler( async (req, res) => {
    const products = await Product.find({user: req.body.id})
    res.status(200).json(products)
})

// @desc  Set Product
// route POST /api/products
// access Private

const setProduct = asyncHandler( async (req, res) => {
    const { name, price, user } = req.body;
    if (!name || !price || user) {
        res.status(400)
        throw new Error("Please add Product Details")
    }
    // if (!req.body.product) {
    //     res.status(400)
    //     throw new Error("Please add Product Details")
    // }
    
    const product = await Product.create({
        product: req.body,
        user: req.body.id
    })
    // const product = new Product({
    //     product: req.body,
    //     user: req.body.id
    // })
    console.log(product)
    res.status(201).json(product)
})

// @desc  Update Product
// route PUT /api/products/:id
// access Private

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error("Product not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the product user
    if(product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updateProduct)
})

// @desc  Delete Product
// route DELETE /api/products/:id
// access Private

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        req.status(400)
        throw new Error("No Product Found!")
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the product user
    if(product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
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