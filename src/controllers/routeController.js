const routeModel = require('../models/routeModel.js');


class Route {

  async getAllRoutes(req, res) {
    const result = await routeModel.getAllRoutes(req);
    if(result.success){
        let routes= [];
        result.data.forEach((route)=>{
        let routeDetail={'route_id': route.shop_id,
                         'route_name' : route.route_name,
                         'week' : route.week,
                         'day' : route.day
        }
        routes.push(routeDetail);
        });
        return res.status(200).send({
            success: result.success,
            data:routes});

    }else{
        return res.status(200).send({
            success : result.success,
            errorType: result.errorType,
            error: result.error
        });
    }
  }


};





const route = new Route();
module.exports = route;
