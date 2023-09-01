// const Cart = require('./cart');
const db = require('../util/database');

// id is not giving by default or as a arguments .it will be created by randomk method but when we need to update 
// products details then on clicking we will get an id as argument to match the data which stored in file
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,imageUrl,description) values(?,?,?,?)',
      [this.title, this.price, this.imageUrl, this.description]);
  }
  // updatedSave(id){
  //   return db.execute('INSERT INTO products (id,title,price,imageUrl,description) values(?,?,?,?,?)',
  //     [this.id,this.title, this.price, this.imageUrl, this.description]);
  // }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
  }

  static deleteProductById(id) {

  }
};
