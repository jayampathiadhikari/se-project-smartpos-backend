const {insertData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {decrementIntegers} = require('../db/index');
const {callTransactionInsertDecrement} = require('../db/index');
const {callTransactionInsertTwo} = require('../db/index');



// exports.sendToCarriage = async (req) => {
//
//     const result = await insertData('outward_carriage_stock', ['agent_id','product_id','quantity'], [req.body.agent_id,req.body.product_id,req.body.quantity]);
//     return result;
// }
//
// exports.removeFromWarehouse = async (req) => {
//
//     const result = await decrementIntegers('warehouse_stock', 'quantity',req.body.quantity ,'product_id',req.body.product_id);
//     return result;
// }

exports.sendAndRemove = async (req) => {

  table1='outward_carriage_stock'
  columns=['agent_id','product_id','quantity']
  values=[req.body.agent_id,req.body.product_id,req.body.quantity]

  table2='warehouse_stock'
  col1='quantity'
  col1update=req.body.quantity
  col2='product_id'
  value=req.body.product_id

  const result = await callTransactionInsertDecrement(table1,columns,values,table2,col1,col1update,col2,value)
  return result;

}
exports.sendAgentReq = async (req) => {
  let table1 = 'outward_carriage_stock';
  let columns = ['agent_id', 'product_id', 'quantity'];
  let values = [req.body.agent_id, req.body.product_id, req.body.quantity];

  let table2 = 'warehouse_stock';
  let col1 = 'quantity';
  let col1update = req.body.quantity;
  let col2 = 'product_id';
  let value = req.body.product_id;

  let pr1 = '';
  values.forEach((item, i) => {
    let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);


  let query1 = `INSERT INTO ${table1}(${columns}) VALUES (${pr1}) RETURNING *`
  let query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `
  const result = await connection.transactionTwo(query1, values, query2, [value]);
  return result
};


exports.insertWarehouseProduct = async(req)=>{

  const col1= ['product_id','name','production_cost','selling_price']
  const val1= [req.body.product_id,req.body.name,req.body.production_cost,req.body.selling_price]
  const col2= ['product_id','quantity']
  const val2= [req.body.product_id,req.body.quantity]

  const result = await callTransactionInsertTwo('product', col1, val1, 'warehouse_stock', col2, val2);
  return result;
}

exports.incrementQuantity = async (req,) => {

    const result = await incrementIntegers('warehouse_stock', 'quantity', req.body.quantity ,'product_id', req.body.product_id);
    return result;
}
