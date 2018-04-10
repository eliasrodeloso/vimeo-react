import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";
import { withRouter } from "react-router";

import Item from "../../components/menu/Item";
import { setActiveCategory } from "../../store/actions/category.actions";

const mapDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category))
});

const mapStateToProps = state => ({
  activeCategory: state.category
});

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.Categories = [];
  }

  render() {
    return this.state.loading ? (
      <CircularProgress className="align-self-center" />
    ) : (
      <List component="nav">{this.Categories}</List>
    );
  }
}

CategoriesList.propTypes = {
  mapStateToProps: PropTypes.object,
  mapDispatchToProps: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
);
