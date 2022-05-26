const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://localhost:27017/google-keep'

const connectToMongo = mongoose.connect(MONGO_URI,(res,err)=>{
    try{
        console.log("connect to mongoose successfully");
    } catch(err){
        console.log(err.message);
    }
})
module.exports = connectToMongo