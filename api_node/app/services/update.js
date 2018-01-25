const  Todo = require('../models/todo');

/*****IMPORT ***/

function updateTodo(req, res) {
    Todo.findById(req.params.id, function(err, todo){
        if(err) res.send(err);

        todo.name = req.body.name;
        todo.desciption = req.body.description;
        todo.priority = req.body.priority;
        todo.status = req.body.status;
        todo.createdAt = new Date();

        todo.save((err, result) => {
            if(err){ res.send(err); }

            res.json({
                id: result._id,
                name : result.name,
                description : result.description,
                priority : result.priority,
                status: result.status,
                updatedAt : result.updatedAt
          });
       });
    });
}
module.exports = {
    updateTodo: updateTodo
};
