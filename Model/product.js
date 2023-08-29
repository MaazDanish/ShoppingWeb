const path = require('path');
const fs = require('fs');

// global p sowe can use it everywhere
const p = path.join(path.dirname(require.main.filename),'data','products.json');

const getProductFromFile = (cb) => {
    const p = path.join(path.dirname(require.main.filename),'data','products.json');
    fs.readFile(p,(err,data) =>{
        if(err){
            return cb([]);
        }
        cb(JSON.parse(data));
    })
}
module.exports = class Product{
    constructor(t){
        this.title=t;
    }
    save(){
        getProductFromFile( (product) => {
            product.push(this);
            fs.writeFile(p,JSON.stringify(product), err =>{
                console.log(err);
            })
        })
    }
    static fetchAll(cb){
    getProductFromFile(cb);   
    }
}