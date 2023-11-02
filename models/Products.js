const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    UserId:{
        type: String,
        required: true
    },
    CategoryId:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Photo:{
        type: String,
        require: true
    },
    Description:{
        type: String
    },
    startdate: {
        type: Date,
        required: true,
        default: new Date()
    }
});
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product