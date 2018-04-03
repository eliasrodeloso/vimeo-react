import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Main Menu</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
