const shopModel = require('../models/shopModel.js');


class Shop {

  async getAllShops(req, res) {
    const result = await shopModel.getAllShops(req);
    if (result.success) {
      let shops = [];
      result.data.forEach((shop) => {
        let shopDetail = {
          'shop_id': shop.shop_id,
          'name': shop.name,
          'latitude': shop.latitude,
          'longitude': shop.longitude
        }
        shops.push(shopDetail);
      });
      return res.status(200).send({
        success: result.success,
        data: shops
      });

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


  async getShopDetails(req, res) {
    const result = await shopModel.getShopDetails(req);
    if (result.success) {
      let shopDetail = {}
      if (result.data.length > 0) {
        shopDetail = {
          'shop_name': result.data[0].name,
          'shop_contact_num': result.data[0].shop_contact_num,
          'owner_name': result.data[0].name_with_initial,
          'owner_cell_num': result.data[0].contact_num_cell,
          'owner_land_num': result.data[0].contact_num_land
        };
      }
      return res.status(200).send({
        success: result.success,
        data: shopDetail
      });

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async getShopsByDistrict(req, res) {
    const result = await shopModel.getShopsByDistrict(req);
    if (result.success) {
      let shops = [];
      result.data.forEach((shop) => {
        let shopDetail = {
          'shop_id': shop.shop_id,
          'name': shop.name,
          'latitude': shop.latitude,
          'longitude': shop.longitude,
          'route_id': shop.route_id
        };
        shops.push(shopDetail);
      });
      return res.status(200).send({
        success: result.success,
        data: shops
      });

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  };

  async getShopsNotInRouteByDistrict(req, res) {
    const result = await shopModel.getShopsNotInRouteByDistrict(req);
    if (result.success) {
      let shops = [];
      result.data.forEach((shop) => {
        let shopDetail = {
          'shop_id': shop.shop_id,
          'name': shop.name,
          'latitude': shop.latitude,
          'longitude': shop.longitude,
          'route_id': shop.route_id
        };
        shops.push(shopDetail);
      });
      return res.status(200).send({
        success: result.success,
        data: shops
      });

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  };

  async getShopsInRouteByDistrict(req, res) {
    const result = await shopModel.getShopsInRouteByDistrict(req);
    if (result.success) {
      let shops = [];
      result.data.forEach((shop) => {
        let shopDetail = {
          'shop_id': shop.shop_id,
          'name': shop.name,
          'latitude': shop.latitude,
          'longitude': shop.longitude,
          'route_id': shop.route_id
        };
        shops.push(shopDetail);
      });
      return res.status(200).send({
        success: result.success,
        data: shops
      });

    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  };

  async viewShops(req, res) {
    const result = await shopModel.getAgentShops(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  };

  async getShopsInSelectedRoute(req, res) {
    const result = await shopModel.getShopsInSelectedRoute(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      return res.send({
        success:true,
        data:result.data})
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


};


const shop = new Shop();
module.exports = shop;
