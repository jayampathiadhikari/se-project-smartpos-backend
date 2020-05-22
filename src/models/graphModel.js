const {getData} = require('../db/index');


exports.getAgentLineGraph = async (req) => {

    const result = await getData('agent_overall_sales','agent_id', req.query.agent_id );
    return result;
}
