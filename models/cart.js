const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Cart {
    static addProductInCart(id, productPrice) {
        // fetch the data
        fs.readFile(p, (err, dataFromFile) => {
            let cart = { products:[], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(dataFromFile);
            }
            // analyze the cart - find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.quantity = updateProduct.quantity +1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
        // increase the quantity if exists else adding the new product
                updateProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updateProduct]; // adding new item with bexisting differ item
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
};
