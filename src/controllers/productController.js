const productModel = require('../models/productModel.js');


class Product{

  async sendtoAgent(req, res) {
    const result = productModel.sendAndRemove(req);
    //here result becomes undefined so always goes to else part, this is bcs the transaction doesnt return anything
    if (result.success) {
      return res.status(200).send('sending was successfull')
      //console.log(result.data);
    } else {
      return res.status(404).send('sending failed');
    }


  }

  async addNewProduct(req, res) {
    const result = await productModel.insertIntoProduct(req);
    const resultt = await productModel.insertIntoWarehouse(req);
    if (result.success) {
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
