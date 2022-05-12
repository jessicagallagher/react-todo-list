const AppTodo = require('../models/models.js');

exports.createOneTodo = (req, res) => {
  AppTodo.create(req.body)
    .then((todo) => {
      console.log({ todo });
      res.json({
        message: 'SUCCESS!',
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'FAIL!',
        error: err.message,
      });
    });
};

exports.listAllTodo = (req, res) => {
  AppTodo.find()
    .then((todo) => {
      console.log({ todo });
      res.json(todo);
    })
    .catch((err) => {
      res.status(404).json({ message: 'NO DATA FOUND!', error: err.message });
    });
};

exports.updateOneTodo = (req, res) => {
  AppTodo.findByIdAndUpdate(req.params.id, req.body)
    .then((todo) => {
      console.log({ todo });
      return res.json({
        message: 'TODO UPDATED!',
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'TODO NOT UPDATED!',
        error: err.message,
      });
    });
};

exports.deleteTodo = (req, res) => {
  AppTodo.findByIdAndRemove(req.params.id, req.body)
    .then((todo) => {
      res.json({
        message: 'TODO DELETED!',
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: `TODO NOT DELETED`,
        error: err.message,
      });
    });
};
