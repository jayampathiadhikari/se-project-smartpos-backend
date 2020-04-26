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

async function updateData(table_name, column_names,values, constraint, constraintvalue) {
  // UPDATE weather SET (temp_lo, temp_hi, prcp) = (temp_lo+1, temp_lo+15, DEFAULT)
  //   WHERE city = 'San Francisco' AND date = '2003-07-03';
  var valuesfinal=''
  values.forEach((value) => {
              console.log(value);
            valuesfinal+="'"+ value+"'"+","

          });

valuesfinal = valuesfinal.slice(0, -1);
console.log(valuesfinal);
  const text = `update ${table_name} set (${column_names}) =(${valuesfinal}) where ${constraint}=$1 `
  //const text = `update ${table_name} set (first_name,street) =('Sam','Muwagama') where ${constraint}=$1`

  const result=await connection.queryParameterized(text,[`${constraintvalue}`]);
  return result;

}



module.exports = { getData,insertData,updateData};
