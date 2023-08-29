const product = [];
module.exports = class Product{
    constructor(t){
        this.title=t;
    }
    save(){
        product.push(this);
    }
    fetchAll(){
        return product;
    }
}