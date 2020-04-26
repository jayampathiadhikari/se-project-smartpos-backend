const { getData } = require('../db/index');
const { insertData } = require('../db/index');
const { updateData } = require('../db/index');
const { editData } = require('../db/index');

exports.getUserData = async (req) => {
  console.log('de')
    const result = await getData('employee', ['employee_id'], req.body.employee_id);
    return result;
}

exports.getAuthData = async (req) => {
  console.log('aesrr')
    const result = await getData('user_authorization', ['username'], req.body.bank_account);
    return result;
}

exports.insertData = async (req) => {
  console.log('de')
    const result =await insertData('employee_role_type', ['role_id','role_name'], [13,'ergrgruurg']);
    return result;
}

exports.updateData = async (req) => {
  console.log('aesrr')
    const result = await updateData('employee', ['first_name','street'],['Sam','Muwagama'],'employee_id',req.body.bank_account);
    return result;
}



exports.editUserData = async (req) => {
  console.log('aesrr')
    const result = await updateData('employee', ['first_name','last_name','gender','street','city','state'],[req.body.first_name,req.body.last_name,req.body.gender,req.body.street,req.body.city,req.body.state],'employee_id',req.body.employee_id);
    return result;
}
