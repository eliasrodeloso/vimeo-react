import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import axios from "axios";

import "./App.scss";
import NestedRoutes from "../../route/nested";
import CategoriesList from "../sideMenu";

const drawerWidth = 280;

const styles = theme => {
  return {
    App__bar: {
      zIndex: theme.zIndex.drawer + 1
    },
    App__main: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    App__paper: {
      width: drawerWidth
    },
    Toolbar: theme.mixins.toolbar,
    menu__icon: {
      marginRight: theme.spacing.unit * 2
    },
    content: {
      textAlign: "center",
      padding: theme.spacing.unit * 3
    }
  };
};

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
        <AppBar className={classes.App__bar}>
          <Toolbar>
            <IconButton className={classes.menu__icon} color="inherit">
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="title">VIMEO TALOS</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{ paper: classes.App__paper }}
          anchor="left"
          variant="permanent"
        >
          <div className={classes.Toolbar} />
          <Divider />
          <CategoriesList axios={this.axios} />
        </Drawer>
        <main className={classes.App__main}>
          <div className={classes.Toolbar} />
          <div className={classes.content}>
            <NestedRoutes axios={this.axios} />
          </div>
        </main>
      </div>
    );
  }
}

App.proptypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
