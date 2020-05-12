
// import ownerModel from '../models/ownerModel.js';

const ownerModel = require('../models/ownerModel.js');

class Owner {
  async viewShopSuggestion(req, res) {
    console.log('req')
    const result = await ownerModel.getSuggestionData(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }



  async acceptShopSuggestion(req, res) {
    const shop_suggestion_id=req.body.shop_suggestion_id;
    const shopdata = await ownerModel.getSuggestionData(req);
    if (shopdata.success) {
      // console.log(shopdata.data);
      // console.log(shopdata.data[0]);
      // console.log(shopdata.data[0].route_id);
      // console.log(shopdata.data.route_id);

      const route_id = shopdata.data[0].route_id
      const name= shopdata.data[0].name
      const latitude= shopdata.data[0].latitude
      const longitude= shopdata.data[0].longitude
      const shop_contact_num= shopdata.data[0].shop_contact_num
      const name_with_initial= shopdata.data[0].name_with_initial
      const contact_num_cell= shopdata.data[0].contact_num_cell
      const contact_num_land= shopdata.data[0].contact_num_land
      const residence_lattitude= shopdata.data[0].residence_lattitude
      const residence_longitude= shopdata.data[0].residence_longitude
      const email=shopdata.data[0].email


      const insertshopowner= await ownerModel.alterShopShopOWner(shop_suggestion_id,name_with_initial,contact_num_cell,contact_num_land,residence_lattitude,residence_longitude,email,route_id,name,latitude,longitude,shop_contact_num);
      //console.log(insertshopowner);

      if (insertshopowner.success){

          console.log('insert success');
          console.log(req)
          res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
          return res.send('successfully sent')


    }
    else{
      return res.status(200).send({
        success: insertshopowner.success,
        errorType: insertshopowner.errorType,
        error: insertshopowner.error
      });
    }
  }

    else {
      return res.status(200).send({
        success: shopdata.success,
        errorType: shopdata.errorType,
        error: shopdata.error
      });
    }
  }


  async declineShopSuggestion(req, res) {
    const shop_suggestion_id=req.body.shop_suggestion_id;
    console.log('req')
    const result = await ownerModel.deleteSuggestion(shop_suggestion_id);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewAgents(req, res) {

    const result = await ownerModel.getAllAgents(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async sendTarget(req, res) {

    const result = await ownerModel.insertTarget(req);

    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewMonthlyTarget(req,res){
      const result = await ownerModel.getTarget(req);

      if (result.success) {
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        return res.send(result.data)
        //console.log(result.data);
      } else {
        return res.status(200).send({
          success: result.success,
          errorType: result.errorType,
          error: result.error
        });
    }
  }




}





const owner = new Owner();
module.exports = owner;
