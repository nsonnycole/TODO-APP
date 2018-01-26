import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import axios from "axios/index";

class TodoStore extends EventEmitter {
  constructor() {
    super()
      this.todos = [];
      axios.get('http://localhost:8081/api/v1/todos')
          .then(function(response){
              dispatcher.dispatch({type: "RECEIVE_TODOS", todos: response.data });
                console.log(response.data._id);
          });

  }

    createTodo(name, description, priority) {

        axios.post('http://localhost:8081/api/v1/todo/add/',{
            name: name.value,
            description: description.value,
            priority: priority.value
        })
        .then(function(response){
            console.log('saved successfully' + response);
        })
        .catch(function(error){
            console.log('saved error');
        });

        this.emit("change");
    }

    removeToDo(id) {
        console.log(id);
        axios.delete('http://localhost:8081/api/v1/todo/remove/'+ id)
        .then(function(response){
            console.log('remove successfully');
        })
        .catch(function(error){
        console.log('remove error');
        });
    }

    updatedToDo(id) {
        console.log(id);
        axios.put('http://localhost:8081/api/v1/todo/update/'+ id,{
            name: name.value,
            description: description.value,
            priority: priority.value
        })
            .then(function(response){
                console.log('updated successfully');
            })
            .catch(function(error){
                console.log('update error');
            });
    }


    changeStatus(id, status) {
       let newStatus = false;
        console.log(id);
        if(status){
            newStatus = false;
        }else{
            newStatus = false;
        }
        axios.delete('http://localhost:8081/api/v1/todo/status/'+ id, {
            status: newStatus
        })
            .then(function(response){
                console.log('Successfully status change');
            })
            .catch(function(error){
                console.log('Change error');
            });
    }

        getAll() {
        return this.todos;
        }


        handleActions(action) {
            switch(action.type) {
              case "CREATE_TODO": {
                this.createTodo(action.text);
                break;
              }
              case "RECEIVE_TODOS": {
                this.todos = action.todos;
                this.emit("change");
                break;
              }
            }
          }

        }

    const todoStore = new TodoStore;
    dispatcher.register(todoStore.handleActions.bind(todoStore));

    export default todoStore;
