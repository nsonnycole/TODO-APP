const Todo = require('./models/todo');
const Logger = require('./logger');


class DAO extends Logger{
    find(){
        return new Promise((resolve, reject) => {
            Todo.find((err, todos) => {
                if (err){
                    this.log(`ERREUR ${err}`);
                    reject(err);
                }

                this.log(`SUCCESS`);
                resolve(todos);
          });
        });
    }

    findOne(id) {
        return new Promise((resolve, reject) => {
            Todo.findById(id, (err, todo) => {
            if(err){
                this.log(`ERREUR ${err}`);
                reject(err);
            }

                this.log(`SUCCESS`);
                resolve(todo);

            });
        });
    }
}

module.exports = new DAO();