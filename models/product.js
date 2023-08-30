const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
// id is not giving by default or as a arguments .it will be created by randomk method but when we need to update 
// products details then on clicking we will get an id as argument to match the data which stored in file
module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), err => {
          console.log(err);
        });
      }else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteProductById(id){
    getProductsFromFile(products => {
      const product = products.find(p=> p.id ===id);
      const updatedProduct = products.filter(prod => prod.id !== id);
      fs.writeFile(p,JSON.stringify(updatedProduct), err => {
        if(!err){
          Cart.deleteCartProduct(id,product.price);
        }
      });
    });

  }
};
