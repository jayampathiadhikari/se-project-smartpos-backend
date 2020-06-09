const reqInvoiceModel = require('../models/reqInvoiceModel.js');
const stockModel = require('../models/stockModel.js');

class ReqInvoice{

  async viewSuggestedList(req, res) {

    const result = await reqInvoiceModel.getSuggestedList(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async declareSuggestion(req, res) {

    const result = await reqInvoiceModel.removeSuggestion(req);
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

  async viewAcceptedList(req, res) {

    const result = await reqInvoiceModel.getAcceptedList(req);
  
    if (result.success) {

      var i;
      var obj;
      var id;

      for (obj of result.data) {
        id = obj.product_id;
        const result2 = await stockModel.getWarehouseQuantity({product_id:id});
        obj.available_qantity=result2.data[0].quantity;
      }

      return res.status(200).send(result)

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewAllInvoices(req, res) {

    const result = await reqInvoiceModel.getInvoices(req);
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

  async getAgentIds(req, res) {
    const result = await reqInvoiceModel.getInvoices(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      const agentIds = [];
      result.data.forEach(data => {
        if(!agentIds.includes(data.employee_id)){
          agentIds.push(data.employee_id)
        }
      });
      return res.status(200).send({
        success:true,
        data: agentIds
      })
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async sendRequest(req, res) {

    const result = await reqInvoiceModel.acceptRequest(req);

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



}

const reqInvoice = new ReqInvoice();
module.exports = reqInvoice;
