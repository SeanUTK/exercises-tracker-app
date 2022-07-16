import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://exercises-tracker-app.herokuapp.com/exercises/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("https://exercises-tracker-app.herokuapp.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
      .post(
        "https://exercises-tracker-app.herokuapp.com/exercises/update/" +
          this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div className="p-5 mx-5 d-flex row">
        <h3 className="justify-content-center d-flex">Edit Exercise Log</h3>
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
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control mt-3 text-center"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group px-5 mx-5 py-3 text-center">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                className="text-center"
              />
            </div>
          </div>

          <div className="form-group px-5 mx-5 py-3 col-6 justify-content-center d-flex">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
