
const {database} = require('../db/postgres');
const employeeModel = require('../models/employeeModel.js');

class Employee {

  async getUserData(req, res) {
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

  async getAuthData(req, res) {
    console.log('dsfdsf')
    const result = await employeeModel.getAuthData(req);
    if (result.success) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.send(result.data)
      // return res.status(200).send({
      //   success: result.success,
      //   data: result.data,
      // });
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async insertData(req, res) {
    console.log('req')
    const result = await employeeModel.insertData(req);
    if (result.success) {
      return res.status(200).send({
        success: result.success,
        data: result.data,
      });
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async getCount(req, res) {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    const count=67;
    return res.send(count.data);
    console.log(count.data);
  }

  async getCountTest(req, res) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      const count=67;
      return res.send(count.data);
      console.log(count.data);
    }


};





const employee = new Employee();
module.exports = employee;

