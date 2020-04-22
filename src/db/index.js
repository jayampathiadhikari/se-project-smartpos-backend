const db = require('../db/db.js');
const connection = require('./postgres');




async function getData(table_name, constraints, values) {

const result=await connection.queryParameterized(`SELECT * from ${table_name} where ${constraints}=$1`,[`${values}`]);
return result;

}

async function insertData(table_name, column_names, values) {
  // console.log(column_names);
  // console.log(values);
  //column_names
  //values=[`${values}`];
  //console.log(values);

  const text = `INSERT INTO ${table_name}(${column_names}) VALUES($1,$2) RETURNING *`

  const result=await connection.queryParameterized(text,values);
  return result;

}



module.exports = { getData,insertData };
