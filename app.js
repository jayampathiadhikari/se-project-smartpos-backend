import express from 'express';
import bodyParser from 'body-parser';
import todoRouter from './src/routes/toDoRoutes';

// Set up the express app
const app = express();
// const port = process.env.PORT || 3000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router is middleware. to use it follows
app.get('/', function(req, res) {
    res.send({'name':'jayamoathi'});
});
app.use(todoRouter);


// app.listen(port, () => {
//     console.log(`Listening on port..3000`)
// });

// import express from 'express';
// //const express = require('express');
// const app = express();
// const path = require('path');
const port = process.env.PORT || 3000;




app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));