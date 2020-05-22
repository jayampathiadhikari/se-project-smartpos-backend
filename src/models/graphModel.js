const { insertData } = require('../db/index');


exports.getSalesDates = async (req) => {

    const result = await getUniqueData('sales natural join agent_salesperson','sold_date', 'agent_id',req.query.agent_id );
    return result;
}
