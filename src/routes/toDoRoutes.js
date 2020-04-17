/**
 * import Router from express-promise-router
 */

const Router = require('express-promise-router');

import toDoController from '../controllers/toDoController.js';

//const router = express.Router();
const router = new Router();


router.get('/db', toDoController.databaseTest);
router.get('/dbpara', toDoController.databaseTestParameterized);

router.get('/api/v1/todos', toDoController.getAllTodos);
router.get('/api/v1/todos/:id', toDoController.getTodo);
router.post('/api/v1/todos', toDoController.createTodo);
router.put('/api/v1/todos/:id', toDoController.updateTodo);
router.delete('/api/v1/todos/:id', toDoController.deleteTodo);

export default router;