
const {database} = require('../db/postgres');
const employeeModel = require('../models/employeeModel.js');

class Employee {
  async getUserData(req, res) {
    console.log('req')
    const result = await employeeModel.getUserData(req);
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
};





const employee = new Employee();
module.exports = employee;
