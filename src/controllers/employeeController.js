
const {database} = require('../db/postgres');
const employeeModel = require('../models/employeeModel.js');

class Employee {

  testToken(req,res){
    return res.status(200).send(employeeModel.generateAuthToken('W9FfmzqWI6QZjGWpRnZOpBhwGM02'))
  };

  async generateToken(req,res){
    const result  = await employeeModel.generateNewToken(req);
    return res.status(200).send(result);
  }


  async getUserData(req, res) {

    const result = await employeeModel.getUserData(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      return res.status(200).send(result);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async getToken(req, res) {

    const result = await employeeModel.getUserData(req);
    if (result.success) {
      //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
      if(result.data.length > 0){
        return res.status(200).send({success: true, data:{
          token: result.data[0].token
          }})
      }else{
        return res.status(200).send({success: false, error: 'No user with that id'})
      }
      //console.log(result.data);
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addEmployee(req,res){

    //role ids : owner - 3, salesperson - 2 , agent - 1
    const result = await employeeModel.addNewEmployee(req);
    if (result.success) {
      return res.status(200).send(result.data)
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addAgent(req,res){
    //owner_id,employee_id
    const result = await employeeModel.addUserAgent(req);
    if (result.success) {
      return res.status(200).send(result)
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async addSalesperson(req,res){
    //agent_id, employee_id
    const result = await employeeModel.addUserSalesperson(req);
    if (result.success) {
      return res.status(200).send(result)
    } else {
      return res.status(200).send({
        success: result.success,
        errorType: result.errorType,
        error: result.error
      });
    }
  }

  async getAuthData(req, res) {
    const result = await employeeModel.getAuthData(req);
    if (result.success) {
      return res.status(200).send(result.data)
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
    //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    const count=67;
    return res.status(200).send(count.data);
    console.log(count.data);
  }

  async updateUserData(req, res) {
      console.log('req')
      const result = await employeeModel.updateData(req);
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

    async editUserData(req, res) {
        //console.log('req')

        const result = await employeeModel.editUserData(req);
        if (result.success) {
          //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
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
