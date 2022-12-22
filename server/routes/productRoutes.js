const express = require("express")
const router = express.Router()
const { getProduct, setProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const { protect } = require("../middleware/authMiddleware")

router.route('/').get(protect, getProduct).post(protect,  setProduct)
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct)

module.exports = router