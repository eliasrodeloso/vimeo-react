import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./App.css";

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const Other = () => (
  <div>
    <h1>Other</h1>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Link to="/">Home</Link>
          <Link to="/other">Other</Link>
        </header>
        <Route exact={true} path="/" component={Home} />
        <Route path="/other" component={Other} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
