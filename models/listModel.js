const mongoose = require('mongoose');
const userSchema = require('./userModel');


const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum : ['hotel', 'resort', 'cottages', 'travel inn', 'cabin', 'camping', 'surfing'],
        default: 'others'
    },
    picture: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
        
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    reviews: [{
        type: String
    }]
})

const Listing = mongoose.model('Listing', listSchema);

module.exports = Listing;
