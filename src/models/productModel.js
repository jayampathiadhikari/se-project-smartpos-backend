const {insertData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {decrementIntegers} = require('../db/index');
const {callTransactionInsertDecrement} = require('../db/index');



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



exports.insertIntoProduct = async (req,) => {

    const result = await insertData('product', ['product_id','name','production_cost','selling_price'], [req.body.product_id,req.body.name,req.body.production_cost,req.body.selling_price]);
    return result;
}

exports.insertIntoWarehouse = async (req,) => {

    const result = await insertData('warehouse_stock', ['product_id','quantity'], [req.body.product_id,req.body.quantity]);
    return result;
}

exports.incrementQuantity = async (req,) => {

    const result = await incrementIntegers('warehouse_stock', 'quantity', req.body.quantity ,'product_id', req.body.product_id);
    return result;
}
