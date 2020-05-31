const {getData} = require('../db/index');
const {getAllData} = require('../db/index');
const {getData_twoConditions} = require('../db/index');
const {updateAgentStock} = require('../db/index');
const {upsert} = require('../db/index');
const {callTransactionInsertDecrementTwo} = require('../db/index');
const connection = require('../db/postgres');

exports.getAgentStock = async (req) => {

    const result = await getData('agent_stock natural join product', 'agent_id',req.query.agent_id );
    return result;
}

exports.getSalespersonStock = async (req) => {
    const result = await getData_twoConditions('salesperson_stock natural join product', ['salesperson_id','stock_received_date'],[req.body.salesperson_id,new Date().toISOString().slice(0,10)]);
    return result;
}

exports.getWarehouse = async (req) => {

    const result = await getAllData('warehouse_stock natural join product');
    return result;
}

exports.getWarehouseQuantity = async (req) => {
  console.log(req);

    const result = await getData('warehouse_stock','product_id',req.product_id);
    return result;
}


exports.insertAgentStock = async (req) => {
  const col='quantity'
  const target= 'on constraint agent_stock_pkey'
  const action=`DO UPDATE SET ${col} =EXCLUDED.${col}+${req.body.new_quantity}`
// where agent_id=${req.body.agent_id} and product_id=${req.body.product_id}
    const result = await upsert('agent_stock',['agent_id','product_id','quantity'],[req.body.agent_id,req.body.product_id,req.body.new_quantity],target,action);
    return result;
}



exports.insertSalespersonStock = async (req) => {
    const columns=['salesperson_id','product_id','initial_quantity','remaining_quantity']
    const values=[req.body.salesperson_id,req.body.product_id,req.body.quantity,req.body.quantity]
    const colupdate = req.body.quantity
    const col1 ='agent_id'
    const val1 = req.body.agent_id
    const col2 ='product_id'
    const val2 = req.body.product_id

    const query1 = `INSERT INTO salesperson_stock(${columns}) VALUES ($1,$2,$3,$4) RETURNING *`
    const query2 = `update agent_stock set quantity = quantity-${colupdate} where ${col1}=$1 and ${col2}=$2`

    const result = await connection.queryTransactionsTwo(query1, values, query2, [val1, val2]);
    return result;

    // const result = await callTransactionInsertDecrementTwo('salesperson_stock',columns,values,'agent_stock','quantity',req.body.quantity,col1,val1,col2,val2);
    // return result;
}
