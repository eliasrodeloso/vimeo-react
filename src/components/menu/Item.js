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
    },
    selected: {
      color: theme.palette.primary.main
    }
  };
};

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.onClick(this.props.category.uri);
  }

  render() {
    const { category, classes } = this.props;
    return (
      <ListItem button onClick={this.handleClick}>
        <Avatar
          className={classes.Avatar}
          alt={category.name}
          classes={{ img: classes.Avatar__img }}
          src={category.icon.sizes[0].link}
        />
        <ListItemText
          classes={{ primary: this.props.selected ? classes.selected : "" }}
          primary={category.name}
        />
      </ListItem>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Item);
