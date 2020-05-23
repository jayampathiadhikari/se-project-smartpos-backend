const productModel = require('../models/productModel.js');


class Product{

  async sendtoAgent(req, res) {
    const result = await productModel.sendAndRemove(req);
    return res.status(200).send(result);
  }

  async addNewProduct(req, res) {

    const result = await productModel.insertWarehouseProduct(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
      //console.log(result.data);
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addProductItems(req, res) {

    const result = await productModel.incrementQuantity(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
      //console.log(result.data);
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}

const product = new Product();
module.exports = product;
