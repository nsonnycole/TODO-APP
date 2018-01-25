import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super();
  }

    handleSubmit(event){
        this.setState({display: this.state.value});
        this.state.value = '';
        event.preventDefault();
    }


  render() {
    const { status, edit, name, description, priority} = this.props;

    const icon = status ? "\u2714" : "\u2716"

    if (edit) {
      return (
      <li class="ui-state-default">
          <div class="checkbox">
              <input type="checkbox" value={name} focus="focused" />
          </div>
      </li>
      );
    }

    return (

    <li class="ui-state-default">
        <div class="checkbox">
            <label>
                <input type="checkbox" value="" />
                <h5>{name}
                {icon}</h5>
            </label>
            <br />
                <span class="description">{description}</span><br />
                <span class="priority">{priority}</span>

        </div>
    </li>


    );
  }
}
