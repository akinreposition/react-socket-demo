const asyncHandler = require('express-async-handler')

const Bid = require('../models/bidModel')
const User = require('../models/userModel')

// @desc    Get bids
// @route   GET /api/bid
// @access  Private
const getBidding = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ user: req.user.id })

  res.status(200).json(bids)
})

// @desc    Set bid
// @route   POST /api/bid
// @access  Private
const setBidding = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const bid = await Bid.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(bid)
})

// @desc    Update bid
// @route   PUT /api/bid/:id
// @access  Private
const updateBidding = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)

  if (!bid) {
    res.status(400)
    throw new Error('Bid not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the bid user
  if (bid.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedBidding = await Bid.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedBidding)
})

// @desc    Delete bid
// @route   DELETE /api/bids/:id
// @access  Private
const deleteBidding = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)

  if (!bid) {
    res.status(400)
    throw new Error('Bid not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (bid.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await bid.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getBidding,
  setBidding,
  updateBidding,
  deleteBidding,
}