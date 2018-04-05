import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";

import { setActiveCategory } from "../../store/actions/category.actions";

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

const mapDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category))
});

const mapStateToProps = state => ({
  activeCategory: state.category
});

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  componentWillMount() {
    if (this.props.index === 0) {
      this.setState({ selected: true });
      this.props.setActiveCategory({
        uri: this.props.category.uri,
        name: this.props.category.name
      });
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
        <ListItemText
          classes={{ primary: this.state.selected ? classes.selected : "" }}
          primary={category.name}
        />
      </ListItem>
    );
  }
}

Category.propTypes = {
  classes: PropTypes.object,
  category: PropTypes.object,
  setActiveCategory: PropTypes.func,
  activeCategory: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Category)
);
