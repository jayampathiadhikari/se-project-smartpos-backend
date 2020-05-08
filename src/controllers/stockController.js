

const stockModel = require('../models/stockModel.js');

class Stock{

  async viewAgentStock(req, res) {

    const result = await stockModel.getAgentStock(req);
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

  async viewSalespersonStock(req, res) {

      const result = await stockModel.getSalespersonStock(req);
      if (result.success) {
        let stock=[]
        result.data.forEach((product)=>{
        let productDetail={'product_id': product.product_id,
                           'name' : product.name,
                           'quantity' : product.remaining_quantity,
                           'unit_price' : product.selling_price
        }
        stock.push(productDetail);
        });
        return res.status(200).send({
            success: result.success,
            data:stock});
      } else {
        return res.status(200).send({
          success: result.success,
          errorType: result.errorType,
          error: result.error
        });
      }
    }

  async viewWarehouseStock(req, res) {

    const result = await stockModel.getWarehouse(req);
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

const stock= new Stock()
module.exports=stock
