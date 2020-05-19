const {getData,getDataNull,getDataNotNull} = require('../db/index');


exports.getAllShops = async (req) => {
    const result = await getData('shop', 'route_id', req.body.route_id);
    return result;
};

exports.getShopDetails = async (req) => {
    const result = await getData('shop natural join shop_owner', 'shop_id',req.body.shop_id);
    return result;
};

exports.getShopsByDistrict = async (req) => {
    const result = await getData('shop', 'district_id', req.body.district_id);
    return result;
};


exports.getAgentShops = async (req) => {

    const result = await getData('shop natural join shop_owner', 'district_id',req.body.district_id );
    return result;
};

exports.getShopsNotInRouteByDistrict = async (req) => {
    const result = await getDataNull('shop','district_id','route_id',req.body.district_id);
    return result;
};

exports.getShopsInRouteByDistrict = async (req) => {
  const result = await getDataNotNull('shop','district_id','route_id',req.body.district_id);
  return result;
};

exports.getShopsInSelectedRoute = async (req) => {
    const result = await getData('shop', 'route_id', req.body.route_id);
    return result;
};