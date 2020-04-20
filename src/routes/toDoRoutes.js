/**
 * import Router from express-promise-router
 */

const Router = require('express-promise-router');


const toDoController = require('../controllers/toDoController.js');
const employeeController = require('../controllers/employeeController.js');

const router = new Router();


router.get('/db', toDoController.databaseTest);

router.get('/employee/profile', employeeController.getUserData);
router.get('/employee/insert', employeeController.insertData);

//router.get('/ownerProfile', ownerController.getUserData);


router.get('/api/v1/todos', toDoController.getAllTodos);
router.get('/api/v1/todos/:id', toDoController.getTodo);
router.post('/api/v1/todos', toDoController.createTodo);
router.put('/api/v1/todos/:id', toDoController.updateTodo);
router.delete('/api/v1/todos/:id', toDoController.deleteTodo);

module.exports= router;
