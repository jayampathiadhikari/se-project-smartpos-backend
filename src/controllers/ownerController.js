// import ownerModel from '../models/ownerModel.js';

const ownerModel = require('../models/ownerModel.js');

class Owner {
  async viewShopSuggestion(req, res) {

    const result = await ownerModel.getAllSuggestionData(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
      //console.log(result.data);
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


  async acceptShopSuggestion(req, res) {
    const shop_suggestion_id = req.body.shop_suggestion_id;
    return ownerModel.getSuggestionData(req).then(
      async(shopdata) => {
        if (shopdata.success) {
          const route_id = shopdata.data[0].route_id
          const district_id = shopdata.data[0].district_id
          const name = shopdata.data[0].name
          const latitude = shopdata.data[0].latitude
          const longitude = shopdata.data[0].longitude
          const shop_contact_num = shopdata.data[0].shop_contact_num
          const name_with_initial = shopdata.data[0].name_with_initial
          const contact_num_cell = shopdata.data[0].contact_num_cell
          const contact_num_land = shopdata.data[0].contact_num_land
          const residence_lattitude = shopdata.data[0].residence_lattitude
          const residence_longitude = shopdata.data[0].residence_longitude
          const email = shopdata.data[0].email
          const insertshopowner = await ownerModel.alterShopShopOWner(shop_suggestion_id, district_id, name_with_initial, contact_num_cell, contact_num_land, residence_lattitude, residence_longitude, email, route_id, name, latitude, longitude, shop_contact_num);
          if (insertshopowner.success) {
            return res.status(200).send(insertshopowner)
          } else {
            return res.status(200).send({
              success: insertshopowner.success,
              errorType: insertshopowner.errorType,
              error: insertshopowner.error
            });
          }
        } else {
          return res.status(200).send({
            success: shopdata.success,
            errorType: shopdata.errorType,
            error: shopdata.error
          });
        }
      }
    ).catch(e => {
      return res.status(200).send({
        success: false,
      })
    });

  }


  async declineShopSuggestion(req, res) {
    const shop_suggestion_id = req.body.shop_suggestion_id;

    const result = await ownerModel.deleteSuggestion(shop_suggestion_id);
    if (result.success) {

      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)


    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewAgents(req, res) {

    const result = await ownerModel.getAllAgents(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async sendTarget(req, res) {

    const result = await ownerModel.insertTarget(req);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)
      //console.log(result.data);
    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewMonthlyTarget(req, res) {
    const result = await ownerModel.getTarget(req);
    //console.log(result);

    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result)

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


}


const owner = new Owner();
module.exports = owner;
