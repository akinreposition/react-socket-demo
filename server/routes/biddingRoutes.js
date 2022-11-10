const express = require('express')
const router = express.Router()
const {
  getBidding,
  setBidding,  
  updateBidding,
  deleteBidding,
} = require('../controllers/bidController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getBidding).post(protect, setBidding)
router.route('/:id').delete(protect, deleteBidding).put(protect, updateBidding)

module.exports = router