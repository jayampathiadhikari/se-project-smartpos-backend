const {getData} = require('../db/index');
const connection = require('../db/postgres');

exports.getAllRoutes = async (req) => {
  const result = await getData('route natural join day_based_plan', 'salesperson_id', req.body.salesperson_id);
  return result;
};
exports.getLatestRouteId = async (req) => {
  const result = await connection.query('SELECT route_id FROM public.route ORDER BY route_id DESC LIMIT 1');
  return result;
};

exports.createNewRoute = async (req) => {
  //texts sould be array of text strings
  //values should be array of array of values
  // const route_id = req.body.next_route_id;
  const shop_ids = JSON.parse(req.body.shop_ids);
  const route_details = JSON.parse(req.body.route_details);
  const createNewRoute = 'INSERT INTO route(route_name, district_id, salesperson_id, day_id) VALUES ($1, $2, $3, $4) RETURNING route_id';
  const createNewRouteValues = [route_details.route_name, route_details.district_id, route_details.salesperson_id, route_details.day_id];
  // const updateShop = `UPDATE shop SET route_id = ${route_id} WHERE shop_id = $1`;

  // const texts = [];
  // const values = [];
  // texts.push(createNewRoute);
  // values.push(createNewRouteValues);
  //
  // shop_ids.forEach((val)=> {
  //     texts.push(updateShop);
  //     values.push([val]);
  // });

  const result = await connection.queryTransactionForRoutes(createNewRoute, createNewRouteValues, shop_ids);
  return result
};


//SELECT * FROM public.route
// ORDER BY route_id ASC LIMIT 100