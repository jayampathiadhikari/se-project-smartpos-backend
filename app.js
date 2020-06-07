const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./src/routes/toDoRoutes.js');
const dotenv = require("dotenv");
//Access-Control-Allow-Origin: http://localhost:3000;

/**
 *when importing use filename.js otherwise wont work
 */

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



//router is middleware. to use it follows
app.get('/', function(req, res) {
  const secret = require('crypto').randomBytes(64).toString('base64')
    res.send({'name':secret});
});
app.use(todoRouter);

const port = process.env.PORT || 4000;

//app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
module.exports = app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
