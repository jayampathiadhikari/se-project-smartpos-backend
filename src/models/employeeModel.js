const { getData } = require('../db/index');
const { insertData } = require('../db/index');
const { updateData } = require('../db/index');
const { editData } = require('../db/index');

exports.getUserData = async (req) => {
  console.log('de')
    const result = await getData('employee', ['employee_id'], req.body.employee_id);
    return result;
};

exports.getAuthData = async (req) => {
  console.log('aesrr')
    const result = await getData('user_authorization', ['username'], req.body.username);
    return result;
}

exports.insertData = async (req) => {
  console.log('de')
    const result =await insertData('employee_role_type', ['role_id','role_name'], [26,'efffggfruurg']);
    return result;
}

exports.addNewEmployee = async (req) => {
  var role_id;
  if (req.body.type === 'agent'){
    role_id = 1
  }else if(req.body.type === 'salesperson'){
    role_id = 2
  }else{
    role_id = 3
  }
  const result =await insertData('employee_fb', ['employee_id','role_id'], [req.body.employee_id,role_id]);
  return result;
};

exports.updateData = async (req) => {
  console.log('aesrr')
    const result = await updateData('employee', ['first_name','street'],['Sam','Muwagama'],'employee_id',req.body.employee_id);
    return result;
}



exports.editUserData = async (req) => {
  console.log('aesrr')
    const result = await updateData('employee', ['first_name','last_name','gender','street','city','state'],[req.body.first_name,req.body.last_name,req.body.gender,req.body.street,req.body.city,req.body.state],'employee_id',req.body.employee_id);
    return result;
}
