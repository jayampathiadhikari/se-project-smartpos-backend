const { getData_twoConditions } = require('../db/index');


exports.getReportDetails = async (req) => {
    const result = await getData_twoConditions('(sales natural join agent_salesperson) natural join product',['agent_id','sold_date'],[req.body.agent_id,req.body.sold_date]);
    return result;
}
