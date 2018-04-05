import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";

const styles = theme => {
  return {
    Avatar: {
      backgroundColor: theme.palette.primary.main
    },
    Avatar__img: {
      width: "unset",
      height: "unset"
    }
  };
};

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  render() {
    const { category, classes } = this.props;
    return (
      <ListItem button>
        <Avatar
          className={classes.Avatar}
          alt={category.name}
          classes={{
            img: classes.Avatar__img
          }}
          src={category.icon.sizes[0].link}
        />
        <ListItemText primary={category.name} />
      </ListItem>
    );
  }
}

Category.propTypes = {
  classes: PropTypes.object,
  category: PropTypes.object
};

export default withStyles(styles)(Category);
