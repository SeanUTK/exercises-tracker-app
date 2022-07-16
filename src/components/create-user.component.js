import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post("https://exercises-tracker-app.herokuapp.com/users/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div className="p-5 mx-5 d-flex row">
        <h3 className="justify-content-center d-flex">Create New User</h3>
        <form
          onSubmit={this.onSubmit}
          className="px-5 m-5 justify-content-center row"
        >
          <div className="form-group px-5 mx-5 py-3 col-6 text-center">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control mt-3 text-center"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group px-5 mx-5 py-3 col-6 justify-content-center d-flex">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
