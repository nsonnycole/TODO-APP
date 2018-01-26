// Check
const check = require('../utilities/check');
// Todos model
const Todo = require('../models/todo');


/* *** *** IMPORTS *** *** */

function post(req, res) {
    console.log(req.body);
    if(!check.checkProperties(req.body))
        return res.sendStatus(400);

  const todo = new Todo();
    todo.name = req.body.name;
    todo.description = req.body.description;
    todo.priority = req.body.priority;
    todo.status = req.body.status;
    todo.createdAt = new Date();

   todo.save((err, result) => {
     if (err) res.send(err)
    {
        res.json({message: 'Tâches created'});
    }
   });
}

module.exports = post;
