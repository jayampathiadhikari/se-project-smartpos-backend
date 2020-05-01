const {insertData} = require('../db/index');
const {incrementIntegers} = require('../db/index');
const {decrementIntegers} = require('../db/index');


exports.sendToCarriage = async (req) => {

    const result = await insertData('outward_carriage_stock', ['agent_id','product_id','quantity'], [req.body.agent_id,req.body.product_id,req.body.quantity]);
    return result;
}

exports.removeFromWarehouse = async (req,) => {

    const result = await decrementIntegers('warehouse_stock', 'quantity',req.body.quantity ,'product_id',req.body.product_id);
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
