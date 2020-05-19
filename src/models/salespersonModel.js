const { getData_twoConditions,getData,getAllData } = require('../db/index');
const { test } = require('../db/index');

exports.getDailyTarget = async (req) => {
    const result = await getData_twoConditions('monthly_target', ['year','month'], [new Date().getFullYear(),new Date().getMonth()+1]);
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





