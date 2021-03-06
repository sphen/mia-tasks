const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getItems,
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  createList,
  deleteList,
} = require('../controllers/todocontroller');

router.all('*', auth);

router.route('/').get(getTodos).post(createList);

router.route('/:id').get(getItems).post(addTodo).delete(deleteList);

router.route('/:id/:itemId').delete(deleteTodo);

router.route('/:id/:itemId/setcomplete').post(completeTodo);

module.exports = router;
