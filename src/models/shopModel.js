const {getData} = require('../db/index');


exports.getAllShops = async (req) => {

    const result = await getData('shop', 'route_id',req.body.route_id );
    return result;
}

exports.getShopDetails = async (req) => {
    const result = await getData('shop natural join shop_owner', 'shop_id',10);
    return result;
}

exports.getAgentShops = async (req) => {

    const result = await getData('(agent_salesperson natural join route_salesperson) natural join (shop natural join shop_owner)', 'agent_id',req.body.agent_id );
    return result;
}
