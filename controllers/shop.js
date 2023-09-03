const Product = require('../models/product');
const Cart = require('../models/cart');

//  showing products on products page /products
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then(products => {
    res.render('shop/product-detail', {
      product: products,
      pageTitle: products.title,
      path: '/products'
    });
  }).catch(err => console.log(err));

};

//  showing products at shop page
exports.getIndex = (req, res, next) => {
  Product.findAll().then(productsData => {
    res.render('shop/index', {
      prods: productsData,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err));
};



exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    Cart.addProductInCart(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
