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

exports.sendAgentReq = async (req) => {
  let table1 = 'outward_carriage_stock';
  let columns = ['agent_id', 'product_id', 'quantity'];
  let values = [req.body.agent_id, req.body.product_id, req.body.quantity];

  let table2 = 'warehouse_stock';
  let col1 = 'quantity';
  let col1update = req.body.quantity;
  let col2 = 'product_id';
  let value = req.body.product_id;

    let pr1 = '';
    values.forEach((item, i) => {
        let num = i + 1
    pr1 += "$" + num + ","
  });

  pr1 = pr1.slice(0, -1);


  let query1 = `INSERT INTO ${table1}(${columns}) VALUES (${pr1}) RETURNING *`
  let query2 = `update ${table2} set ${col1} =${col1}-${col1update} where ${col2}=$1 `
  const result = await connection.transactionTwo(query1, values, query2, [value]);
  return result
};
//SELECT * FROM public.route
// ORDER BY route_id ASC LIMIT 100