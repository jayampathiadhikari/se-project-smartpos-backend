
const {database} = require('../db/postgres');
const salespersonModel = require('../models/salespersonModel.js');

class Salesperson {

  async getDailyTarget(req,res){
    const result = await salespersonModel.getDailyTarget(req);
    if(result.success){
        let target= {'target_value':'Target Not Assigned'};
        if (result.data.length>0){
            target.target_value=result.data[0].target_value;
        }

        return res.status(200).send({
            success: result.success,
            data:target});

    }else{
        return res.status(200).send({
            success : result.success,
            errorType: result.errorType,
            error: result.error
        });
    }
  }
};

const salesperson = new Salesperson();
module.exports = salesperson;
