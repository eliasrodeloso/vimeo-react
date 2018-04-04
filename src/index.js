import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CssBaseline from "material-ui/CssBaseline";

import "./style/index.scss";
import Navigation from "./route/routes.js";
import reducer from "./store/reducers";
import registerServiceWorker from "./registerServiceWorker";
import { configureBackend } from "./utils/fake-backend";

const state = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={state}>
      <React.Fragment>
        <CssBaseline />
        <Navigation />
      </React.Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
configureBackend();
registerServiceWorker();
