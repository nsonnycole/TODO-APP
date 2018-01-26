import React from "react";
import axios from "axios/index";

export default class Todo extends React.Component {
  constructor(props) {
    super();
      this.removeToDo = this.removeToDo.bind(this);
  }

    handleSubmit(event){
        this.setState({display: this.state.value});
        this.state.value = '';
        event.preventDefault();
    }


    setStatusToDo(id) {
        console.log(id);
        axios.get('http://localhost:8081/api/v1/todo/status/'+ id )
            .then(function(response){
                dispatcher.dispatch({type: "RECEIVE_TODOS", todos: response.data });
            });
    }



    render() {
      const {_id, status, edit, name, description, priority} = this.props;

      const icon = status ? "\u2714" : "\u2716"

      if (edit) {
          return (
              <li class="ui-state-default">
                  <div class="checkbox">
                      <input type="checkbox" value={name} focus="focused"/>
                  </div>
              </li>
          );
      }

          return (
              <li class="ui-state-default">
                  <div class="checkbox">
                      <label>
                          <input type="checkbox" value=""/>
                          <h5>{name} &nbsp;
                              {icon}</h5>
                      </label>
                      {/*<span className="close" onClick={this.removeToDo.bind(this, {id})}>X</span>*/}
                      <br/>
                      <span class="description">{description} hi</span><br/>
                      <span class="priority">{priority} / 10</span>
                      <button class="btn btn-xs btn-warning pull-right">Modifier</button>
                      <br/>
                  </div>

              </li>
          );

  }

}
