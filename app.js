
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
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
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    // Gather the jwt access token from the request header
    if(req.originalUrl.includes('/api/v1/auth/')){
      console.log('auth route')
      next();
    }else{
      console.log('non auth route')
      const authHeader = req.headers['authorization'];
      dotenv.config();
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null){
        console.log('no token found');
        return res.status(200).send({
          success: false,
          error: 'No token found'
        })
      }
      jwt.verify(token, process.env.TOKEN_SECRET, (err, employee_id) => {
        if (err) {
          console.log("Invalid Token");
          return res.status(200).send({
            success: false,
            error: 'Token Corrupted'
          });
        }else{
          req.employee_id = employee_id
        }
        next()
      })

    }



  }
);


//router is middleware. to use it follows
app.get('/', function (req, res) {
  const secret = require('crypto').randomBytes(64).toString('base64')
  res.send({'name': secret});
});
app.use(todoRouter);

const port = process.env.PORT || 4000;

//app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
module.exports = app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
