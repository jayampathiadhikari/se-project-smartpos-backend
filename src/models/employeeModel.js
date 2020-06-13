const { getData } = require('../db/index');
const { insertData } = require('../db/index');
const { updateData, updateSingleStringData } = require('../db/index');
const { callTransactionInsertTwoForiegn , addUser} = require('../db/index');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.verifyToken = (req,res,next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null){
    console.log('no token found');
    return res.status(200).send({
      success: false,
      error: 'No token found'
    })
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, employee_id) => {
    if (error) {
      console.log("Token corrupted");
      return res.status(200).send({
        success: false,
        error: 'Token Corrupted'
      });
    }else{
      req.employee_id = employee_id
    }
    next()
  })
};

exports.generateAuthToken = (userid) => {
  dotenv.config();
  return jwt.sign({employee_id : userid}, process.env.TOKEN_SECRET);
};

exports.generateNewToken = async (req) => {
  dotenv.config();
  const token = jwt.sign({employee_id : req.query.employee_id}, process.env.TOKEN_SECRET);

  const result = await updateSingleStringData('employee','token',token.toString(),'employee_id',req.query.employee_id);

  return result;

};

exports.getUserData = async (req) => {
  console.log('de')
    const result = await getData('employee', ['employee_id'], req.query.employee_id);
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
  console.log(req.body.employee_id);
  console.log(req.body.role_id);
  var role_id;
  if (req.body.type === 'agent'){
    role_id = 1
  }else if(req.body.type === 'salesperson'){
    role_id = 2
  }else{
    role_id = 3
  }
  module.exports.generateAuthToken(req.body.employee_id);
  const result =await insertData('employee', ['employee_id','role_id'], [req.body.employee_id,role_id]);
  return result;
};


exports.addNewAgent = async (req) => {

    const result = await callTransactionInsertTwoForiegn('employee', ['employee_id','role_id'], [req.body.agent_id,1], 'owner_agent',['owner_id','agent_id'], [req.body.owner_id,req.body.agent_id]);
    return result;
}


exports.addNewSalesperson = async (req) => {

    const result = await callTransactionInsertTwoForiegn('employee', ['employee_id','role_id'], [req.body.salesperson_id,2], 'agent_salesperson', ['agent_id','salesperson_id'], [req.body.agent_id,req.body.salesperson_id]);
    return result;
}



exports.updateData = async (req) => {

    const result = await updateData('employee', ['first_name','street'],['Sam','Muwagama'],'employee_id',req.body.employee_id);
    return result;
}



exports.editUserData = async (req) => {

    const result = await updateData('employee', ['first_name','last_name','gender','street','city','state'],[req.body.first_name,req.body.last_name,req.body.gender,req.body.street,req.body.city,req.body.state],'employee_id',req.body.employee_id);
    return result;
}

exports.addUserAgent = async (req) => {
  const token = module.exports.generateAuthToken(req.body.employee_id);
  const res = await addUser([req.body.employee_id,1,req.body.district_id, token],'owner_agent',['owner_id','agent_id'],[req.body.owner_id])
  return res
}

exports.addUserSalesperson = async (req) => {
  const token = module.exports.generateAuthToken(req.body.employee_id);
  const res = await addUser([req.body.employee_id,2,req.body.district_id, token],'agent_salesperson',['agent_id','salesperson_id'],[req.body.agent_id])
  return res
}
