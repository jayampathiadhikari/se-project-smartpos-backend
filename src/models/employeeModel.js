const { getData } = require('../db/index');
const { insertData } = require('../db/index');

exports.getUserData = async (req) => {
  console.log('de')
    const result = await getData('employee', ['employee_id'], 1345);
    return result;
}

exports.getAuthData = async (req) => {
  console.log('aesrr')
    const result = await getData('user_authorization', ['username'], 1345);
    return result;
}

exports.insertData = async (req) => {
  console.log('de')
    const result =await insertData('employee_role_type', ['role_id','role_name'], [13,'ergrgruurg']);
    return result;
}
