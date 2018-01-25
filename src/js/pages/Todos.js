import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

    handleSubmit(event){
        this.setState({display: this.state.value});
        this.state.value = '';
        event.preventDefault();
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
        <div class="row">
            <div class="col-md-12">
                <div class="todolist not-done">
                    <h1>Que dois-je faire ?</h1>
                    <form  onSubmit={this.handleSubmit.bind(this)}>
                        <input  type="text" class="form-control add-todo" placeholder="Nouvelle tâche" />
                        <br />
                        <textarea class="form-control" ></textarea>
                         <br />
                         <input type="text" class="form-control text-center"  min="1" max="10" />

                        <input id="checkAll"  class="btn btn-success" type="submit"  value="submit" />
                    </form>
                    <h3>{this.state.display}</h3>

                        
                        {/*<p id="checkAll">Mark all as done</p>*/}

                </div>
            </div>
            <div class="col-md-6">
                <div class="todolist">
                    <h1>Mes tâches</h1>
                    <button class="btn btn-info" onClick={this.reloadTodos.bind(this)}>Reload!</button>
                    <ul  id="sortable" class="list-unstyled">{TodoComponents}</ul>
                    <div class="todo-footer">
                        <strong><span class="count-todos"></span></strong> 2 Items Left
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="todolist">
                    <h1>Fait</h1>
                    <ul id="done-items" class="list-unstyled">
                        <li>Some item <button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>
                    </ul>
                </div>
            </div>
       </div>
    );
  }
}
