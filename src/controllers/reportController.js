const reportModel = require('../models/reportModel.js');

class Report{

  async viewReport(req, res) {

    const result = await reportModel.getReportDetails(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewTopProductsMonthOwner(req, res) {

    const result = await reportModel.getTopProductsOwnerMonth(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}




const report = new Report();
module.exports = report;
