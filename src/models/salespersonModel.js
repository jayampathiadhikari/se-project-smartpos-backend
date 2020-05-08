const { getData_twoConditions } = require('../db/index');

exports.getDailyTarget = async (req) => {
    const result = await getData_twoConditions('monthly_target', ['year','month'], [new Date().getFullYear(),new Date().getMonth()+1]);
    return result;
}




