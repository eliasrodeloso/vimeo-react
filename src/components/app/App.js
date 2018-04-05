import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Typography from "material-ui/Typography";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import axios from "axios";

import CategoriesList from "../categoriesList";
import "./App.scss";

const drawerWidth = 280;

const styles = theme => ({
  App__main: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  App__paper: {
    width: drawerWidth
  },
  Toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor(props) {
    super(props);
    this.axios = axios.create({
      baseURL: "https://api.vimeo.com/",
      timeout: 5000,
      headers: {
        Authorization: "Bearer c4819bdb2cb20ff47a25609a882b7a50",
        Accept: "application/vnd.vimeo.*+json;version=3.4"
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Drawer
          classes={{ paper: classes.App__paper }}
          anchor="left"
          variant="permanent"
        >
          <div className={classes.Toolbar}>
            <Typography className="App__title" variant="title" color="inherit">
              VIMEO REACT
            </Typography>
          </div>
          <Divider />
          <CategoriesList axios={this.axios} />
        </Drawer>
        <main className={classes.App__main}>asxasd</main>
      </div>
    );
  }
}

App.proptypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
