const db = require('../db/db.js');
const connection = require('./postgres');


async function getData(table_name, constraints, values) {
    const result=await connection.queryParameterized(`SELECT * from ${table_name} where ${constraints}=$1`,[`${values}`]);
    return result;

}

async function getAllData(table_name, constraints, values) {

    const result=await connection.queryParameterized(`SELECT * from ${table_name} `,[]);
    return result;

}


async function getData_twoConditions(table_name, constraints, values) {

    const f_constraint=constraints[0]
    const s_constraint=constraints[1]

    //console.log(f_constraint);
    //console.log(s_constraint);

    //worked
    // const text = `SELECT * FROM ${table_name} WHERE ${f_constraint}=$1 `;
    // const valueslist = [1345];


    const text = `SELECT * FROM ${table_name} WHERE ${f_constraint}=$1 AND ${s_constraint}=$2`;

    const result=await connection.queryParameterized(text,values);
    return result;

}

async function insertData(table_name, column_names, values) {
  // console.log(column_names);
  // console.log(values);
  //column_names
  //values=[`${values}`];
  //console.log(values);
        var pr=''
        values.forEach((item, i) => {
            num=i+1
              pr+="$"+num+","
        });

        pr=pr.slice(0,-1);
  //console.log(pr)
        const text = `INSERT INTO ${table_name}(${column_names}) VALUES(${pr}) RETURNING *`

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
  //const text = `update ${table_name} set (first_name,last_name) =('Sam','Perera') where ${constraint}=$1`

  const result=await connection.queryParameterized(text,[`${constraintvalue}`]);
  return result;

}

async function updateSingleData(table_name, column_name,value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${value} where ${constraint}=$1 `

  const result=await connection.queryParameterized(text,[`${constraintvalue}`]);
  return result;

}

async function decrementIntegers(table_name, column_name,value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${column_name}-${value} where ${constraint}=$1 `

  const result=await connection.queryParameterized(text,[`${constraintvalue}`]);
  return result;

}

async function incrementIntegers(table_name, column_name,value, constraint, constraintvalue) {

  const text = `update ${table_name} set ${column_name} =${column_name}+${value} where ${constraint}=$1 `


  const result=await connection.queryParameterized(text,[`${constraintvalue}`]);
  return result;

}


async function deleteData(table_name, constraint, value) {

const result=await connection.queryParameterized(`Delete from ${table_name} where ${constraint}=$1`,[`${value}`]);
return result;

}



module.exports = { getData,insertData,updateData,deleteData,getData_twoConditions,updateSingleData,decrementIntegers,incrementIntegers,getAllData};
