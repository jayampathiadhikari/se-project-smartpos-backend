// import db from '../db/db.js';
// import {database} from '../db/postgres';
// import ownerModel from '../models/ownerModel.js';

//const db = require('../db/db.js');
const {database} = require('../db/postgres');
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
    console.log('req')
    const result = await ownerModel.getUserData(req);
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

  async declineShopSuggestion(req, res) {
    console.log('req')
    const result = await employeeModel.getUserData(req);
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

};





const owner = new Owner();
module.exports = owner;
