import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";
import { withRouter } from "react-router-dom";

import { setActiveCategory } from "../../store/actions/category.actions";

const mapStateToProps = state => ({
  activeCategory: state.category
});

const mapDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category))
});

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
    this.state = {
      selected: false
    };
  }

  componentWillMount() {
    if (this.props.activeCategory.uri === this.props.category.uri) {
      this.setState({ selected: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      if (nextProps.activeCategory.uri === this.props.category.uri) {
        this.setState({ selected: true });
      } else {
        this.setState({ selected: false });
      }
    }
  }

  render() {
    const { category, classes } = this.props;
    return (
      <ListItem
        button
        onClick={evt => this.props.history.push(`${category.uri}`)}
      >
        <Avatar
          className={classes.Avatar}
          alt={category.name}
          classes={{ img: classes.Avatar__img }}
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

Item.propTypes = {
  classes: PropTypes.object,
  category: PropTypes.object,
  activeCategory: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(styles)(Item))
);
