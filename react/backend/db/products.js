const mongoose = require('mongoose');
require('./config')

const productschema = new mongoose.Schema({
    userId:String,
    name:String,
    price:String,
    category:String,
    company:String

})

module.exports = mongoose.model('products',productschema);