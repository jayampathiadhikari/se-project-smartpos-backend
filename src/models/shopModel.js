const {getData} = require('../db/index');


exports.getAllShops = async (req) => {

    const result = await getData('shop', 'route_id',req.body.route_id );
    return result;
}

exports.getShopDetails = async (req) => {
    const result = await getData('shop natural join shop_owner', 'shop_id',10);
    return result;
}

