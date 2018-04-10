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

import "./App.scss";
import MenuContainer from "../../containers/MenuContainer";

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
          <MenuContainer />
        </Drawer>
        <main className={classes.App__main}>
          <div className={classes.Toolbar} />
          <div className={classes.content}>{this.props.children}</div>
        </main>
      </div>
    );
  }
}

App.proptypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
