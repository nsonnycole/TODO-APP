import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
          id: 113464613,
          name: "Go Shopping",
          description: "C'est les soldes!",
          priority: 10,
          status: false
      },
      {
          id: 235684679,
          name: "Pay Water Bill",
          description: "Water what!",
          priority: 3,
          status: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
        id,
        name,
        description,
        priority,
        status: false,
    });

    this.emit("change");
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
