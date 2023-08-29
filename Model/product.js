const product = [];
module.exports = class Product{
    constructor(t){
        this.title=t;
    }
    save(){
        product.push(this);
    }
    static fetchAll(){
        return product;
    }
}