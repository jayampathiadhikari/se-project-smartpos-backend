const db = require('../db/db.js');
const connection = require('./postgres');


async function getData(table_name, constraints, values) {

  const result = await connection.queryParameterized(`SELECT * from ${table_name} where ${constraints}=$1`, [`${values}`]);
  return result;

}

async function getUniqueData(table_name,coloumn,constraints, values) {

  const result = await connection.queryParameterized(`SELECT ${coloumn} from ${table_name} where ${constraints}=$1`, [`${values}`]);
  return result;

}

async function getUniqueAllData(table_name,coloumn) {

  const result = await connection.queryParameterized(`SELECT ${coloumn} from ${table_name} `, []);
  return result;

}

async function getDataNotNull(table_name, constraints, notnullcolumn, values) {

  const result = await connection.queryParameterized(`SELECT * from ${table_name} where ${constraints}=$1 and ${notnullcolumn} is not null`, [`${values}`]);
  return result;

}

async function getDataNull(table_name, constraints, nullcolumn, values) {

  const result = await connection.queryParameterized(`SELECT * from ${table_name} where ${constraints}=$1 and ${nullcolumn} is null`, [`${values}`]);
  return result;

}


async function getAllData(table_name) {

  const result = await connection.queryParameterized(`SELECT * from ${table_name} `, []);
  return result;

}


async function getData_twoConditions(table_name, constraints, values) {

  const f_constraint = constraints[0]
  const s_constraint = constraints[1]

  //console.log(f_constraint);
  //console.log(s_constraint);

  //worked
  // const text = `SELECT * FROM ${table_name} WHERE ${f_constraint}=$1 `;
  // const valueslist = [1345];


  const text = `SELECT * FROM ${table_name} WHERE ${f_constraint}=$1 AND ${s_constraint}=$2`;

  const result = await connection.queryParameterized(text, values);
  return result;

}

async function insertData(table_name, column_names, values) {
  // console.log(column_names);
  // console.log(values);
  //column_names
  //values=[`${values}`];
  //console.log(values);
  var pr = ''
  values.forEach((item, i) => {
    let num = i + 1;
    pr += "$" + num + ","
  });

  pr = pr.slice(0, -1);
  //console.log(pr)
  const text = `INSERT INTO ${table_name}(${column_names}) VALUES(${pr}) RETURNING *`;

  const result = await connection.queryParameterized(text, values);
  return result;

}

async function updateData(table_name, column_names, values, constraint, constraintvalue) {
  // UPDATE weather SET (temp_lo, temp_hi, prcp) = (temp_lo+1, temp_lo+15, DEFAULT)
  //   WHERE city = 'San Francisco' AND date = '2003-07-03';
  var valuesfinal = ''
  values.forEach((value) => {
    //console.log(value);
    valuesfinal += "'" + value + "'" + ","

  });

  valuesfinal = valuesfinal.slice(0, -1);
  //console.log(valuesfinal);
  const text = `update ${table_name} set (${column_names}) =(${valuesfinal}) where ${constraint}=$1 `
  //const text = `update ${table_name} set (first_name,last_name) =('Sam','Perera') where ${constraint}=$1`

  const result = await connection.queryParameterized(text, [`${constraintvalue}`]);
  return result;

}

async function updateSingleData(table_name, column_name, value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${value} where ${constraint}=$1 `
  const result = await connection.queryParameterized(text, [`${constraintvalue}`]);
  return result;

}

async function updateSingleStringData(table_name, column_name, value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} ='${value}' where ${constraint}=$1 `
  const result = await connection.queryParameterized(text, [`${constraintvalue}`]);
  return result;

}

async function decrementIntegers(table_name, column_name, value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${column_name}-${value} where ${constraint}=$1 `

  const result = await connection.queryParameterized(text, [`${constraintvalue}`]);
  return result;

}

async function incrementIntegers(table_name, column_name, value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${column_name}+${value} where ${constraint}=$1 `


  const result = await connection.queryParameterized(text, [`${constraintvalue}`]);
  return result;

}


async function deleteData(table_name, constraint, value) {

  const result = await connection.queryParameterized(`Delete from ${table_name} where ${constraint}=$1`, [`${value}`]);
  return result;

}

async function upsert(table_name, column_names, values, target, action) {

  var pr = ''
  values.forEach((item, i) => {
    let num = i + 1
    pr += "$" + num + ","
  });

  pr = pr.slice(0, -1);

  const text = `INSERT INTO ${table_name}(${column_names}) VALUES(${pr}) ON CONFLICT ${target} ${action}`

  const result = await connection.queryParameterized(text, values);
  return result;


  // ON CONFLICT on constraint agent_stock_pkey
  // DO UPDATE SET quantity = quantity+${added_quantity} where agent_id=${agent_id} and product_id=${product_id}`

  // INSERT INTO agent_stock (agent_id, product_id, quantity)
  // VALUES (${agent_id}, ${product_id}, ${added_quantity})
  // ON CONFLICT on constraint agent_stock_pkey
  // DO UPDATE SET quantity = quantity+${added_quantity} where agent_id=${agent_id} and product_id=${product_id}`


}


async function callTransactionInsertInsert(table_name1, column_names1, values1, table_name2, column_names2, values2, table_name3, column_names3, values3) {

  var pr1 = ''
  values1.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);

  var pr2 = ''
  values2.forEach((item, i) => {
    let num = i + 1
    pr2 += "$" + num + ","
  });

  pr2 = pr2.slice(0, -1);

  let query1 = `INSERT INTO ${table_name1}(${column_names1}) VALUES (${pr1}) RETURNING *`
  let query2 = `INSERT INTO ${table_name2}(${column_names2}) VALUES (${pr2})`
  let query3 = `Delete from ${table_name3} where ${column_names3}=$1`


  const result = await connection.queryTransaction(query1, values1, query2, values2, query3, values3);
  return result;

}

async function callTransactionInsertTwo(table_name1, column_names1, values1, table_name2, column_names2, values2) {

  var pr1 = ''
  values1.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);

  var pr2 = ''
  values2.forEach((item, i) => {
    let num = i + 1
    pr2 += "$" + num + ","
  });

  pr2 = pr2.slice(0, -1);

  let query1 = `INSERT INTO ${table_name1}(${column_names1}) VALUES (${pr1}) RETURNING *`
  let query2 = `INSERT INTO ${table_name2}(${column_names2}) VALUES (${pr2})`


  const result = await connection.queryTransactionsTwo(query1, values1, query2, values2);
  return result;

}


async function callTransactionInsertTwoForiegn(table_name1, column_names1, values1, table_name2, column_names2, values2) {

  var pr1 = ''
  values1.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);

  var pr2 = ''
  values2.forEach((item, i) => {
    let num = i + 1
    pr2 += "$" + num + ","
  });

  pr2 = pr2.slice(0, -1);

  let query1 = `INSERT INTO ${table_name1}(${column_names1}) VALUES (${pr1}) RETURNING *`
  let query2 = `INSERT INTO ${table_name2}(${column_names2}) VALUES (${pr2})`


  const result = await connection.queryTransactionsTwoForiegnKey(query1, values1, query2, values2);
  return result;

}

async function callTransactionInsertDecrement(table1, columns, values, table2, col1, col1update, col2, value) {

  var pr1 = ''
  values.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);


  let query1 = `INSERT INTO ${table1}(${columns}) VALUES (${pr1}) RETURNING *`
  let query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `

  return connection.transactionTwo(query1, values, query2, [value]).then(res=>{
    return res
  }).catch(err => {
    return {
      success: false,
      errorType: 'connection error',
      error: err.stack
    };
  });
  //const result = await connection.queryTransactionsTwo(query1, values, query2, [value]);
  //console.log(result);
  //return result;


}


async function callTransactionInsertDecrementTwo(table1, columns, values, table2, col, colupdate, col1, val1, col2, val2) {

  var pr1 = ''
  values.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);


  let query1 = `INSERT INTO ${table1}(${columns}) VALUES (${pr1}) RETURNING *`
  let query2 = `update ${table2} set ${col} =${col}-${colupdate} where ${col1}=$1 and ${col2}=$2`

  const result = await connection.queryTransactionsTwo(query1, values, query2, [val1, val2]);
  return result;


}

async function addUser(values1,table2,columns2,values2){
  //values1- employee-id & role_id
  //values2 - supervisor_id
  const query1 = `INSERT INTO employee (employee_id,role_id,district_id, token) VALUES ($1,$2,$3, $4) RETURNING *`;
  const query2 = `INSERT INTO ${table2} (${columns2}) VALUES ($1,$2)`;
  const result = await connection.queryTransactionAddUser(query1,values1,query2,values2);
  return result;

}


module.exports = {
  getData,
  getUniqueData,
  getUniqueAllData,
  getDataNull,
  getDataNotNull,
  insertData,
  updateData,
  deleteData,
  getData_twoConditions,
  updateSingleData,
  updateSingleStringData,
  decrementIntegers,
  upsert,
  incrementIntegers,
  getAllData,
  callTransactionInsertInsert,
  callTransactionInsertDecrement,
  callTransactionInsertDecrementTwo,
  callTransactionInsertTwo,
  callTransactionInsertTwoForiegn,
  addUser

};
