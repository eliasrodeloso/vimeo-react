import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./style/index.scss";
import Navigation from "./route/routes.js";
import reducer from "./store/reducers";
import registerServiceWorker from "./registerServiceWorker";

const state = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={state}>
      <Navigation />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
