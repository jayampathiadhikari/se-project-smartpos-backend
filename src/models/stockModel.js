const {getData} = require('../db/index');
const {getAllData} = require('../db/index');
const {getData_twoConditions} = require('../db/index');


exports.getAgentStock = async (req) => {

    const result = await getData('agent_stock natural join product', 'agent_id',req.body.agent_id );
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
