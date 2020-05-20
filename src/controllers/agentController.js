// import db from '../db/db.js';
// import {database} from '../db/postgres';
// import ownerModel from '../models/ownerModel.js';

const db = require('../db/db.js');
const {database} = require('../db/postgres');
const agentModel = require('../models/agentModel.js');


class Agent {

  async suggestShops(req, res) {

    const result = await agentModel.insertSuggestions(req);
    if (result.success) {
      
      return res.status(200).send(result)

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async viewSalesDates(req, res) {

    const result = await agentModel.getSalesDates(req);

    if (result.success) {
      
      return res.status(200).send(result)

    } else {
      return res.status(404).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }


};





const agent = new Agent();
module.exports = agent;
