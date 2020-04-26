// import db from '../db/db.js';
// import {database} from '../db/postgres';
// import ownerModel from '../models/ownerModel.js';

//const db = require('../db/db.js');
const {database} = require('../db/postgres');
const ownerModel = require('../models/ownerModel.js');

class Owner {
  async showShopSuggestions(req,res){
    if(result.success){
      //result= await ownerModel.
      return res.send(result)
    }


  }

};





const owner = new Owner();
module.exports = owner;
