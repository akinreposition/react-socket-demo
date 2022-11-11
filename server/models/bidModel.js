const mongoose = require('mongoose')

const bidSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text vaule'],
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    // name: {
    //   type: String,
    //   required: [true, 'Please add name of product'],
    // },
    // price: {
    //     type: Number,
    //     required: [true, 'Please enter price of product'],
    // },
    // owner: {
    //     type: String,
    //     required: [true, 'Please add product owner'],
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