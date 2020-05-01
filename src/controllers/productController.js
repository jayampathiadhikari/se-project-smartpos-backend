const productModel = require('../models/productModel.js');


class Product{

  async sendtoAgent(req, res) {
    var sendresult={}
    var removeresult={}

        try {
          sendresult = await productModel.sendToCarriage(req);
          removeresult =await productModel.removeFromWarehouse(req);

        } catch (e) {
            throw e
        }finally{
          res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
          res.send(removeresult)
        }


  }

  async addNewProduct(req, res) {

    const result = await productModel.insertIntoProduct(req);
    const resultt = await productModel.insertIntoWarehouse(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addProductItems(req, res) {

    const result = await productModel.incrementQuantity(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}

const product = new Product();
module.exports = product;
