const asyncHandler = require('express-async-handler')

const Bid = require('../models/bidModel')
const User = require('../models/userModel')

// @desc  Get Bids
// routes GET /api/bids
// access Private

const getBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ user: req.body.id })
  res.status(200).json(bids)
}) 

// @desc  Set Bid
// routes POST /api/bids
// access Private

const setBid = asyncHandler(async (req, res) => {
  if(!req.body) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  const bid = await Bid.create({
    bid: req.body.bid,
    user: req.user.id
  })
  
  res.status(201).json(bid)
})

// @desc  Update Bid
// routes PUT /api/bids/:id
// access Private

const updateBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)

  if (!bid) {
    res.status(400)
    throw new Error("Bid not found")
  }
  const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.status(200).json(updatedBid)
})

// @desc  Delete Bid
// routes DELETE /api/bids/:id 
// access Private

const deleteBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)

  if(!bid) {
    res.status(400)
    throw new Error ("No Bid found")
  }

 await bid.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getBids,
  setBid,
  updateBid,
  deleteBid
}