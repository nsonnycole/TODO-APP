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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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

    removeToDo(index, id) {
        this.setState({
            todos: this.state.todos.filter((x,i) => i != index )
        });
        TodoStore.removeToDo(id);
    }

    reloadTodos() {
    TodoActions.reloadTodos();
  }

    changeStatus(id, status){
      TodoStore.changeStatus(id,status);
    }

    handleSubmit(event) {

        event.preventDefault();
        let title = document.getElementById("name"),
            message = document.getElementById("description"),
            proprity = document.getElementById("proprity");

        if(title.value != "" && message.value != "") {
            let newKey = this.state.todos.length+1;
            this.setState({
                todos: this.state.todos.concat([{
                    name: title.value,
                    description: message.value,
                    proprity: proprity.value,
                    status: false,
                }])
            })

            TodoStore.createTodo(title, message, proprity);
            this.reloadTodos();
            title.value = "";
            message.value = "";
            title.focus();
        } else {
            //alert("Vous devez remplir tous les champs");
        }

    }

    handleChange(event){
        this.setState({value: event.target.value});
    }


    addToDo(e) {

            let title = document.getElementById("name"),
                message = document.getElementById("description"),
                proprity = document.getElementById("proprity"),
                newStatus = false;

            if( document.getElementById("status").value != ""){
                 newStatus = false;
            }else{
                 newStatus = true;
            }
            if(title.value != "" && message.value != "") {
                let newKey = this.state.todos.length+1;
                this.setState({
                    todos: this.state.todos.concat([{
                        name: title.value,
                        description: message.value,
                        proprity: proprity.value,
                        status: newStatus,
                    }])
                })

                TodoStore.createTodo(title, message, proprity);
                this.reloadTodos();
                title.value = "";
                message.value = "";
                title.focus();
            } else {
               //alert("Vous devez remplir tous les champs");
            }

    }


    updateToDo(e) {

        let title = document.getElementById("name"),
            message = document.getElementById("description"),
            proprity = document.getElementById("proprity"),
            newStatus = false;


        if( document.getElementById("status").value != ""){
            newStatus = false;
        }else{
            newStatus = true;
        }

        console.log(newStatus);
        if(title.value != "" && message.value != "") {
            let newKey = this.state.todos.length+1;
            this.setState({
                todos: this.state.todos.concat([{
                    name: title.value,
                    description: message.value,
                    proprity: proprity.value,
                    status: newStatus,
                }])
            })

            TodoStore.createTodo(title, message, proprity);
            this.reloadTodos();
            title.value = "";
            message.value = "";
            title.focus();
        } else {
            //alert("Vous devez remplir tous les champs");
        }

    }



    render() {
    const { todos } = this.state;

    // const TodoComponents = todos.map((todo, index) => {
    //     return <Todo key={todo.id} {...todo}/>;
    // });

    return (
        <div class="row">
            <div class="col-md-6">
                <div class="todolist not-done">
                    <h1>Que dois-je faire ?</h1>
                        <form>
                        <input id="name" type="text" class="form-control" placeholder="Nouvelle tâche" required />
                        <br />
                        <textarea id="description" class="form-control" placeholder="description" required></textarea>
                         <br />
                        <select id="proprity" class="form-control" required>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                            <br />

                            <input id="status" type="checkbox"  /><label for="status">Résolu</label>
                            <br />
                        <input id="checkAll"  class="btn btn-success" type="submit" onClick={this.handleSubmit} value="Ajouter" />
                        </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="todolist">
                    <h1>Mes tâches</h1>
                        <ul  id="sortable" class="list-unstyled">
                            {this.state.todos.map(function(todo, index){
                                let icon = status ? "\u2714" : "\u2716";

                                return <li class="ui-state-default" key={index} >
                                    <h5 onClick={this.changeStatus.bind(this, todo._id, todo.status)}>{todo.name} &nbsp;  {icon}</h5>
                                    <span class="description">{todo.description}</span><br/>

                                    <span className="close" onClick={this.removeToDo.bind(this, index, todo._id)}>X</span> <br />

                                    <span class="priority">{todo.priority} / 10</span>
                                    {/*<button class="btn btn-xs btn-warning pull-right">Modifier</button>*/}
                                </li>
                            }, this)}

                        </ul>

                    <div class="todo-footer">
                        <strong><span class="count-todos"></span></strong> {this.state.todos.length} Tâches à faire
                    </div>
                    <hr />
                    <button class="btn btn-info" onClick={this.reloadTodos.bind(this)}>Recharger !</button>
                </div>
            </div>
            {/*<div class="col-md-6">*/}
                {/*<div class="todolist">*/}
                    {/*<h1>Fait</h1>*/}
                    {/*<ul id="done-items" class="list-unstyled">*/}
                        {/*<li>Some item <button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
            {/*</div>*/}
       </div>
    );
  }
}
