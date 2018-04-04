import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CssBaseline from "material-ui/CssBaseline";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme } from "material-ui/styles";
import orange from "material-ui/colors/orange";

import "./style/index.scss";
import Navigation from "./route/routes.js";
import reducer from "./store/reducers";
import registerServiceWorker from "./registerServiceWorker";

const state = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = createMuiTheme({
  palette: {
    primary: orange
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={state}>
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Navigation />
        </MuiThemeProvider>
      </React.Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
