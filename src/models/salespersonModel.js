const { getData_twoConditions,getData,getAllData } = require('../db/index');
const connection = require('../db/postgres');

exports.getDailyTarget = async (req) => {
    const result = await getData_twoConditions('monthly_target', ['year','month'], [new Date().getFullYear(),new Date().getMonth()+1]);
    return result;
};

exports.getTargetAchieved = async (req) => {
    const text = `SELECT sum(selling_price*quantity) as target_achieved from invoice natural join invoice_items natural join product where salesperson_id =$1 and issued_date=$2`;
    const values=[req.body.salesperson_id,new Date().toISOString().slice(0, 10)];
    const result = await connection.queryParameterized(text,values);

    return result;
};

exports.getAssignedDates = async (req) => {
    const res = getData('route','salesperson_id',req.body.salesperson_id);
    return res;
};

exports.getDatesInfo = async() => {
    const res = getAllData('day_based_plan');
    return res;
};





