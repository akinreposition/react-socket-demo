const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        productName: {
            type: String,
            required: [true, 'Please add product name']
        },
        price: {
            type: Number,
            required:[true, 'Please add a price']
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Product', productSchema)