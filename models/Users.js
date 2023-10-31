const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    role: {
        type: Number,
        required: true,
        default: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    startdate: {
        type: Date,
        required: true,
        default: new Date()
    },
    // blogs:[{
    //   type: mongoose.Types.ObjectId,
    //   ref: "Blog",
    //   required: true
    // }]
});
const Users = mongoose.model('User', userSchema)
module.exports = Users