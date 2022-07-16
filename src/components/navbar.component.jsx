import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-5 py-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand py-2">
            ExcerTracker
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link px-5">
                  Exercises
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link px-5">
                  Create Exercise Log
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link px-5">
                  Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
