/**
 * import Router from express-promise-router
 */

const Router = require('express-promise-router');


const toDoController = require('../controllers/toDoController.js');
const employeeController = require('../controllers/employeeController.js');
const agentController = require('../controllers/agentController.js');

const router = new Router();


router.get('/db', toDoController.databaseTest);

router.get('/employee/profile', employeeController.getUserData);
router.get('/employee/auth', employeeController.getAuthData);
router.post('/employee/insert', employeeController.insertData);
router.get('/employee/count', employeeController.getCount);
router.post('/employee/update', employeeController.updateUserData);
router.post('/employee/edit', employeeController.editUserData);
router.post('/agent/suggest', agentController.suggestShops);



//router.get('/ownerProfile', ownerController.getUserData);


router.get('/api/v1/todos', toDoController.getAllTodos);
router.get('/api/v1/todos/:id', toDoController.getTodo);

module.exports= router;
