import dispatcher from "../dispatcher";
import axios from 'axios';

export function createTodo(name, description, priority) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    name, description, priority
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id,
  });
}

export function reloadTodos() {

    axios.get('http://localhost:8081/api/v1/todos')
        .then(function(response){

            dispatcher.dispatch({type: "FETCH_TODOS"});
            setTimeout(() => {
                dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
                        response.data
                    ]});
            }, 1000);
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
        });



}

