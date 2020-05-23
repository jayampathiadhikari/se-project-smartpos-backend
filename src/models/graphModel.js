const {getData} = require('../db/index');
const {getData_twoConditions} = require('../db/index');


exports.getAgentLineGraph = async (req) => {

    const result = await getData('agent_overall_sales','agent_id', req.query.agent_id );
    return result;
}


exports.getOwnerLineGraph = async (req) => {

    const result = await getData('owner_overall_sales','owner_id', req.query.owner_id );
    return result;
}

exports.getAgentBarGraph = async (req) => {

    const result = await getData_twoConditions('agent_overall_sales',['agent_id','product_id'], [req.query.agent_id ,req.query.product_id]);
    return result;
}

exports.getOwnerBarGraph = async (req) => {

    const result = await getData_twoConditions('owner_overall_sales',['owner_id','product_id'], [req.query.owner_id,req.query.product_id] );
    return result;
}
