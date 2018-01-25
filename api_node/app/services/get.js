// Todo Model
const Todo = require('../models/todo');
const DAO = require('../dao');
// const Users = {
//   "0": {
//     "name": 'Naomie',
//     "gender": 'femme',
//     "age": 18,
//     "active": 1,
//     "createdAt": Date.now,
//     "updatedAt": Date.now
//   },
//   "1": {
//     "name": "Sarah",
//     "gender": 'femme',
//     "age": 22,
//     "active": 0,
//     "createdAt": Date.now,
//     "updatedAt": Date.now
//   }
// }



/* *** *** IMPORTS *** *** */

function initMessage() {
  console.log('init called');
  return { message: 'hello world !' };
}

function init(req, res) {
  const message = initMessage();
  res.json(message);
}

// function getUsers(req, res) {
//   DAO.find()
//       .then((users) => res.json(users))
//     .catch(err => res.send(err));
// }

async function getTodos (req, res) {
    try {
      const findTodos = await DAO.find();
      res.json(findTodos);
    }
    catch (err){
      res.send(err);
    }
}

async function getTodo (req, res) {
    try {
        const findTodo = await DAO.findOne(req.params.id);
        res.json(findTodo);
    }
    catch (err){
        res.send(err);
    }
}


module.exports = {
  init: init,
  initMessage: initMessage,
    getTodos: getTodos,
    getTodo: getTodo
};
