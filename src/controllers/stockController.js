

const stockModel = require('../models/stockModel.js');

class Stock{

  async viewAgentStock(req, res) {

    const result = await stockModel.getAgentStock(req);
    if (result.success) {

      var array=[];
      array=result.data

      array.sort(function compare(a, b) {

          const revA = a.name;
          const revB = b.name;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      return res.status(200).send({
        success:result.success,
        data:array
      })

      //return res.status(200).send(result)

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addToAgentStock(req,res) {

    const result = await stockModel.insertAgentStock(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)

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

    async addToSalespersonStock(req, res) {

      const result = await stockModel.insertSalespersonStock(req);
      if (result.success) {
        //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        return res.status(200).send(result)

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

      var array=[];
      array=result.data

      array.sort(function compare(a, b) {

          const revA = a.name;
          const revB = b.name;

          let comparison = 0;
          if (revA > revB) {
            comparison = 1;
          } else if (revA < revB) {
            comparison = -1;
          }
          return comparison;
      });

      return res.status(200).send({
        success:result.success,
        data:array
      })

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
