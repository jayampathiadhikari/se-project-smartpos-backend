const {insertData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {decrementIntegers} = require('../db/index');
const {callTransactionInsertDecrement} = require('../db/index');
const {callTransactionInsertTwo} = require('../db/index');
const {getUniqueAllData} = require('../db/index');
const {getExistance} = require('../db/index');
const connection = require('../db/postgres');


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

exports.sendFromList = async (req) => {

  let table1='outward_carriage_stock'
  let columns=['agent_id','product_id','quantity']
  let values1=[req.body.agent_id,req.body.product_id,req.body.quantity]

  let table2='warehouse_stock'
  let col1='quantity'
  let col1update=req.body.quantity
  let col2='product_id'
  let values2=[req.body.product_id]

  let table3='requesting_invoice_items'
  let col3='state_accepted'
  let cons='requesting_invoice_items_id'
  let values3=['sent', req.body.requesting_invoice_items_id]

  let query1 = `INSERT INTO ${table1}(${columns}) VALUES ($1,$2,$3) RETURNING *`
  let query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `
  let query3=  `update ${table3} set ${col3} =$1 where ${cons}=$2 `

  const result = await connection.queryTransactionsThree(query1, values1, query2, values2,query3, values3)
  //const result = await callTransactionInsertDecrement(table1,columns,values,table2,col1,col1update,col2,value)
  return result;

}
exports.sendByWish = async (req) => {
  let table1 = 'outward_carriage_stock';
  let columns = ['agent_id', 'product_id', 'quantity'];
  let values1 = [req.body.agent_id, req.body.product_id, req.body.quantity];

  let table2 = 'warehouse_stock';
  let col1 = 'quantity';
  let col1update = req.body.quantity;
  let col2 = 'product_id';
  let values2 = [req.body.product_id];

  let query1 = `INSERT INTO ${table1}(${columns}) VALUES ($1,$2,$3) RETURNING *`
  let query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `

  const result = await connection.queryTransactionsTwo(query1, values1, query2, values2);
  return result
};


exports.insertWarehouseProduct = async(req)=>{

  const col1= ['product_id','name','production_cost','selling_price']
  const val1= [req.body.product_id,req.body.name,req.body.production_cost,req.body.selling_price]
  const col2= ['product_id','quantity']
  const val2= [req.body.product_id,req.body.quantity]

  let query1 = `INSERT INTO product(${col1}) VALUES ($1,$2,$3,$4) RETURNING *`
  let query2 = `INSERT INTO warehouse_stock(${col2}) VALUES ($1,$2)`


  const result = await connection.queryTransactionsTwo(query1, val1, query2, val2);
  return result;

  // const result = await callTransactionInsertTwo('product', col1, val1, 'warehouse_stock', col2, val2);
  // return result;
}

exports.incrementQuantity = async (req,) => {

    const result = await incrementIntegers('warehouse_stock', 'quantity', req.body.quantity ,'product_id', req.body.product_id);
    return result;
}

exports.isAvailable = async (req,) => {

    const result = await getExistance('product', 'product_id', req.query.product_id);
    return result;
}

exports.getAllProductIds = async (req,) => {

    const result = await getUniqueAllData('product', 'product_id');
    return result;
}
