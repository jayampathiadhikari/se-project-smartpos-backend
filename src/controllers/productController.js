const productModel = require('../models/productModel.js');


class Product{

  async sendAgentRequested(req, res) {
    const result = await productModel.sendFromList(req);
    if (result.success) {
      return res.status(200).send(result);
    }
    else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }


  }

  async sendtoAgent(req, res) {
    const result = await productModel.sendByWish(req);
    if (result.success) {
      return res.status(200).send(result);
    }
    else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }


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

  async addProductItems(req,res) {

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

  async allProductIds(req,res) {

    const result = await productModel.getAllProductIds(req);
    if (result.success) {

      var product_ids=[]
      var obj;

      for (obj of result.data) {
        product_ids.push(obj.product_id)
      }

      return ({
        success:result.success,
        data:product_ids
      });

    } else {
      return ({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}

const product = new Product();
module.exports = product;
