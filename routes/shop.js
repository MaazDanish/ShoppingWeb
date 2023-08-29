const express = require('express');
const path = require('path');
const productController = require('../Controller/productController');

const router = express.Router();

router.get('/',productController.getAllProducts);

module.exports = router;
