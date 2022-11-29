const mongoose = require('mongoose')

const bidSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add name of product'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter price of product'],
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //     required: [true, 'Please add product owner'],
    //     ref: 'User'
    // },
    // last_bidder: {
    //     type: String,
    //     required: [true, 'Please add product owner'],
    // },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Bid', bidSchema)