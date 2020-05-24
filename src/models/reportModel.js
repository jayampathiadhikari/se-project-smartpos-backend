const { getData_twoConditions } = require('../db/index');
const {getAllData } = require('../db/index');
const {getData } = require('../db/index');


exports.getReportDetails = async (req) => {
    const result = await getData_twoConditions('(sales natural join agent_salesperson) natural join product',['agent_id','sold_date'],[req.query.agent_id,req.query.sold_date]);
    return result;
}

exports.getAllAgentSales = async (req) => {
    const result = await getAllData('agent_overall_sales');
    return result;
}

exports.getAllDistrictSales = async (req) => {
    const result = await getAllData('overall_district_sales');
    return result;
}

exports.getDistrictName = async (id) => {
    const result = await getData('district','district_id',id);
    return result;
}
