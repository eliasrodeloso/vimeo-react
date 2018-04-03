import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import "./style/index.scss";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
