import express from 'express';

import toDoController from '../controllers/todoController';

const router = express.Router();

router.get('/api/v1/todos', toDoController.getAllTodos);
router.get('/api/v1/todos/:id', toDoController.getTodo);
router.post('/api/v1/todos', toDoController.createTodo);
router.put('/api/v1/todos/:id', toDoController.updateTodo);
router.delete('/api/v1/todos/:id', toDoController.deleteTodo);

export default router;