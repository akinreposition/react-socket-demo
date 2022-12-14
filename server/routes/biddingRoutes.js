const express = require('express')
const router = express.Router()
const { getBids, setBid, updateBid, deleteBid  } = require('../controllers/bidController')


const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(protect, getBidding).post(protect, setBidding)
// router.route('/:id').delete(protect, deleteBidding).put(protect, updateBidding)

router.route('/').get(protect, getBids).post(protect, setBid)
router.route('/:id').put(protect, updateBid).delete(protect, deleteBid)

module.exports = router