const {getData} = require('../db/index');
const {getAllData} = require('../db/index');


exports.getAgentStock = async (req) => {

    const result = await getData('agent_stock natural join product', 'agent_id',req.body.agent_id );
    return result;
}


exports.getWarehouse = async (req) => {

    const result = await getAllData('warehouse_stock natural join product');
    return result;
}
