import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: "",
    };
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  clearReminders() {
    this.props.clearReminders();
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                className="list-item delete-btn"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="I have to..."
              onChange={(e) => this.setState({ text: e.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={(e) => this.setState({ dueDate: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add reminder
          </button>
        </div>
        {this.renderReminders()}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.clearReminders()}
        >
          Clear Reminders
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reminders: state,
  };
};

// export default connect(null, {addReminder})(App);
export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders,
})(App);
