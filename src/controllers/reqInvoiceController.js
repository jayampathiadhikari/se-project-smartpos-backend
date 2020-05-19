const reqInvoiceModel = require('../models/reqInvoiceModel.js');

class ReqInvoice{

  async viewSuggestedList(req, res) {
    console.log('req')
    const result = await reqInvoiceModel.getSuggestedList(req);
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

  async declareSuggestion(req, res) {
    console.log('req')
    const result = await reqInvoiceModel.removeSuggestion(req);
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

  async viewAcceptedList(req, res) {

    const result = await reqInvoiceModel.getAcceptedList(req);
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

  async sendRequest(req, res) {

    const result = await reqInvoiceModel.acceptRequest(req);

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

const reqInvoice = new ReqInvoice();
module.exports = reqInvoice;
