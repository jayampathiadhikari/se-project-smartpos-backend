import express from 'express';
import bodyParser from 'body-parser';

import todoRouter from './src/routes/todoRoutes.js';

/**
 * toDo routes are just used as examples
 */

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router is middleware. to use it follows
app.get('/', function(req, res) {
  res.send({'name':'jayamoathi'});
});
app.use(todoRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port ${port}!`));