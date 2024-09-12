const express = require("express")

const productrouter = express.Router()
const {createProduct} = require('../Controller/productController')


productrouter.post('/create', createProduct)

module.exports = productrouter