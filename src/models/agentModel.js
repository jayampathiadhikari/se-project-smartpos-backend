const { getData } = require('../db/index');

exports.getSalesDates = async (req) => {

    const result = await getData('sales natural join agent_salesperson', 'agent_id',req.body.agent_id );
    return result;
}
