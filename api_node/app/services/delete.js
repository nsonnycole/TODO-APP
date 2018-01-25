const  Todo = require('../models/todo');

/*****IMPORT ***/

function deleteTodo(req, res) {
    Todo.remove({ _id: req.params.id}, err => {
        if(err) res.send(err);
        res.json({ message : 'Successfully deleted'});
    });
}
module.exports = {
    deleteTodo: deleteTodo
};