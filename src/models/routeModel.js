const {getData} = require('../db/index');


exports.getAllRoutes = async (req) => {

    const result = await getData('route natural join day_based_plan', 'salesperson_id',req.body.salesperson_id );
    return result;
}

