const { getUniqueData} = require('../db/index');
const { insertData } = require('../db/index');


exports.getSalesDates = async (req) => {

    const result = await getUniqueData('sales natural join agent_salesperson','sold_date', 'agent_id',req.query.agent_id );
    return result;
}

exports.insertSuggestions = async (req) => {

    const result = await insertData('shop_suggestions', ['name','route_id','latitude','longitude','shop_contact_num','name_with_initial','contact_num_cell','contact_num_land','residence_lattitude','residence_longitude','email'], [req.body.name,req.body.route_id,req.body.latitude,req.body.longitude,req.body.shop_contact_num,req.body.name_with_initial,req.body.contact_num_cell,req.body.contact_num_land,req.body.residence_lattitude,req.body.residence_longitude,req.body.email]);
    return result;
}
