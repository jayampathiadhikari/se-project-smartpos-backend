//import express from 'express';
const express = require('express');
//import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
//import todoRouter from './src/routes/toDoRoutes.js';
const todoRouter = require('./src/routes/toDoRoutes.js');
//Access-Control-Allow-Origin: http://localhost:3000;

/**
 *when importing use filename.js otherwise wont work
 */

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router is middleware. to use it follows
app.get('/', function(req, res) {
  // const customers=[
  //   {id:1, firstName:'John', lastName:'Doe'},
  //   {id:2, firstName:'Jo', lastName:'Do'}
  // ];
  // res.json(customers);
    res.send({'name':'jayamoathi'});
});
app.use(todoRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
