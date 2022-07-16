import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("https://exercises-tracker-app.herokuapp.com/users/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
          username: response.data[0].username,
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .post("https://exercises-tracker-app.herokuapp.com/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  render() {
    return (
      <div className="p-5 mx-5 d-flex row">
        <h3 className="justify-content-center d-flex">
          Create New Exercise Log
        </h3>
        <form
          onSubmit={this.onSubmit}
          className="px-5 m-5 justify-content-center row"
        >
          <div className="form-group px-5 mx-5 py-3 col-6 text-center">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control mt-3 text-center"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group px-5 mx-5 py-3 col-6 text-center">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control mt-3 text-center"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group px-5 mx-5 py-3 col-6 text-center">
            <label>Duration (in minuts): </label>
            <input
              type="text"
              className="form-control mt-3 text-center"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group px-5 mx-5 py-3 text-center">
            <label className="">Date: </label>
            <div className="mt-3">
              <DatePicker
                className="text-center"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group px-5 mx-5 py-3 col-6 justify-content-center d-flex">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
