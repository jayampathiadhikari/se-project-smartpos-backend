
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
  };

  async getUnassignedDays(req,res){
    //we need user ID
    return salespersonModel.getAssignedDates(req).then( result1 => {
      return salespersonModel.getDatesInfo().then(result2 => {
        if (result1.success && result2.success){
          const freeDates = [];
          const assignedDates = result1.data.map((row)=>(row.day_id));
          const datesInfo = result2.data;
          datesInfo.forEach((info)=> {
            if(!assignedDates.includes(info.day_id)){
              freeDates.push(info)
            }
          });
          return res.status(200).send({
            success: true,
            data:freeDates
          });
        }else{
          throw res.status(200).send({
            success : false,
            errorType: result1.errorType || result2.errorType ,
            error: result1.error || result2.error
          });
        }
      })
    });
  }
};

const salesperson = new Salesperson();
module.exports = salesperson;
