const express = require('express');
const path = require('path');

const productController = require('../Controller/productController');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product',productController.postProduct);

module.exports = router;
