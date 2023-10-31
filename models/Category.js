const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    UserId:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Type: {
        type: String,
        required: true,
    },
    Photo:{
        type: String,
    },
    Amout: {
        type: String,
        required: true
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
const Category = mongoose.model('Categories', CategoriesSchema)
module.exports = Category