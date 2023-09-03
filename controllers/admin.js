const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

//  posting added product tothe page from db
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(() => {
    console.log('created a product');
    res.redirect('/');
  }).catch(err => console.log(err));
};

//  getting all details which we have to edit while clicking on edit button
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    }).catch(err => console.log(err));
};

//  posted updated products on the page from db
exports.postEditedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);

  Product.findByPk(prodId)
    .then(products => {
      products.title = updatedTitle;
      products.price = updatedPrice;
      products.imageUrl = updatedImageUrl;
      products.description = updatedDescription;
      return products.save();
    })
    .then(result => {
      console.log("Succesfully done");
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}


// showing products on /admin/product page 
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log('Some error occured', err));
};

//  deleting products from admin page /admins/products
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      console.log("Successfully Deleted ------------");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}

