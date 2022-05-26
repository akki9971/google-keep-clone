const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name : { 
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        split: true
    },
    date: {
        type: Date,
        default: new Date
    }

})
const UserModel = mongoose.model('users',UserSchema)
UserModel.createIndexes()
module.exports = UserModel