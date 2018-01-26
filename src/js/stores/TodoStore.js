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

          });

  }

    createTodo(name, description, priority) {
        const id = Date.now();
        this.todos.push({
            id,
            name,
            description,
            priority,
            status: false,
        });

        // axios.post('http://localhost:8081/api/v1/todo/add/'+ name.value +'/'+ description.value  +'/'+ priority.value )
        //     .then(function(response){
        //         dispatcher.dispatch({type: "RECEIVE_TODOS", todos: response.data });
        //         console.log('saved successfully')
        //     });

        this.emit("change");
    }

  getAll() {
    return this.todos;
  }

    removeToDo(id) {
        console.log(id);
        axios.get('http://localhost:8081/api/v1/todo/:id')
            .then(function(response){
                // dispatcher.dispatch({type: "RECEIVE_TODOS", todos: response.data });
            });
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
