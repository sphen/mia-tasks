const Todo = require('../models/Todo');
const List = require('../models/List');

// list

// get all todos
// GET /api/todos
// public
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await List.find();

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    // 500 for server error
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Create todo list
// POST /api/todos/
// public
exports.createList = async (req, res, next) => {
  try {
    const { title } = req.body;

    const list = await List.create(req.body);

    return res.status(201).json({
      success: true,
      data: list,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      // 400 for client error
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Delete todo list
// DELETE /api/todos/:id
// public
exports.deleteList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      // 404 for not found
      return res.status(404).json({
        success: false,
        error: 'No List Found',
      });
    }

    await list.remove();
    res.status(200).json({
      succes: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// list items

// get all todo items
// GET /api/todos/:id
// public
exports.getItems = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    const items = list.items;

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    // 500 for server error
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// add todos
// POST /api/todos/:id
// public
exports.addTodo = async (req, res, next) => {
  try {
    // find list by id
    const list = await List.findById(req.params.id);
    // pull text from req.body with destructuring
    const { text } = req.body;
    // mongoose.push onto list.items array
    list.items.push(req.body);
    // console log testing
    const item = list.items[list.items.length - 1];
    console.log(item);

    // save list
    await list.save();

    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      // 400 for client error
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Delete todo
// DELETE /api/todos/:id/:itemId
// public
exports.deleteTodo = async (req, res, next) => {
  try {
    // find list by :id
    const list = await List.findById(req.params.id);
    // console.log(list);
    // check if list exists
    if (!list) {
      // 404 for not found
      return res.status(404).json({
        success: false,
        error: 'No List Found',
      });
    }
    // find todo item by :itemId
    const item = list.items.id(req.params.itemId);
    // console.log(item);
    // check if item exists
    if (!item) {
      // 404 for not found
      return res.status(404).json({
        success: false,
        error: 'No Todo Item Found',
      });
    }

    // remove todo item
    item.remove();
    // save list
    await list.save(function (err) {
      if (err) return handleError(err);
      console.log('the todo item was removed');
    });

    // await list.remove();
    res.status(200).json({
      succes: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Complete todo
// POST /api/todos/:id/:itemId/setcomplete
// public
exports.completeTodo = async (req, res, next) => {
  try {
    // find list by :id
    const list = await List.findById(req.params.id);
    // console.log(list);
    // check if list exists
    if (!list) {
      // 404 for not found
      return res.status(404).json({
        success: false,
        error: 'No List Found',
      });
    }
    // find todo item by :itemId
    const item = list.items.id(req.params.itemId);
    console.log(item);
    // check if item exists
    if (!item) {
      // 404 for not found
      return res.status(404).json({
        success: false,
        error: 'No Todo Item Found',
      });
    }

    // toggle complete and save

    item.complete = !item.complete;
    await list.save(function (err) {
      if (err) return handleError(err);
      console.log('the todo item was updated');
    });

    // await list.remove();
    res.status(200).json({
      succes: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
