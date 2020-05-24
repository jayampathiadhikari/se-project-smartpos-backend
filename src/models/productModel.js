const {insertData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {decrementIntegers} = require('../db/index');
const {callTransactionInsertDecrement} = require('../db/index');
const {callTransactionInsertTwo} = require('../db/index');
const {getUniqueAllData} = require('../db/index');
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

exports.sendAndRemove = async (req) => {

  table1='outward_carriage_stock'
  columns=['agent_id','product_id','quantity']
  values1=[req.body.agent_id,req.body.product_id,req.body.quantity]

  table2='warehouse_stock'
  col1='quantity'
  col1update=req.body.quantity
  col2='product_id'
  values2=[req.body.product_id]

  table3='requesting_invoice_items'
  col3='state_accepted'
  colval3='sent'
  cons='requesting_invoice_items_id'
  value3=[req.body.requesting_invoice_items_id]
  
  query1 = `INSERT INTO ${table1}(${columns}) VALUES ($1,$2,$3) RETURNING *`
  query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `
  query3=  `update ${table3} set ${col3} =${colval3} where ${cons}=$1 `

  const result = await connection.queryTransactionsThree(query1, values1, query2, values2,query3, values3)
  //const result = await callTransactionInsertDecrement(table1,columns,values,table2,col1,col1update,col2,value)
  return result;


}



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

exports.getAllProductIds = async (req,) => {

    const result = await getUniqueAllData('product', 'product_id');
    return result;
}
