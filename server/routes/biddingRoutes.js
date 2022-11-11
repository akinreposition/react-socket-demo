const express = require('express')
const router = express.Router()
const { getBids, setBid, updateBid, deleteBid  } = require('../controllers/bidController')
// const {
  // getBidding,
//   setBidding,  
//   updateBidding,
//   deleteBidding,
// } = require('../controllers/bidController')

// const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(protect, getBidding).post(protect, setBidding)
// router.route('/:id').delete(protect, deleteBidding).put(protect, updateBidding)

router.route('/').get(getBids).post(setBid)
router.route('/:id').put(updateBid).delete(deleteBid)

module.exports = router