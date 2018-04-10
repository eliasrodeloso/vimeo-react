import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import List from "material-ui/List";
import { CircularProgress } from "material-ui/Progress";

import {
  setActiveCategory,
  fetchCategoriesList
} from "../store/actions/category.actions";
import Item from "../components/menu/Item";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { setActiveCategory, fetchCategoriesList },
    dispatch
  )
});

const mapStateToProps = ({ category }) => ({
  store: {
    categories: category.categories,
    activeCategory: category.activeCategory
  }
});

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesLoaded: false,
      categoriesList: []
    };
    this.buildFlatList = this.buildFlatList.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchCategoriesList();
  }

  buildFlatList(categories, nextActiveCategory = {}) {
    let arr = [];
    categories.forEach((category, index) => {
      arr.push(
        <Item
          key={index}
          category={category}
          onClick={this.handleCategorySelected}
          selected={nextActiveCategory.uri === category.uri}
        />
      );
    });
    return arr;
  }

  componentWillUpdate(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      if (nextProps.store.categories.length > 0) {
        this.setState({
          categoriesLoaded: true,
          categoriesList: this.buildFlatList(
            nextProps.store.categories,
            nextProps.store.activeCategory
          )
        });
      }
    }
  }

  handleCategorySelected(categoryUri) {
    if (this.props.store.activeCategory.uri !== categoryUri) {
      this.props.store.categories.forEach(category => {
        if (category.uri === categoryUri) {
          this.props.actions.setActiveCategory(category);
          this.props.history.push(categoryUri);
          return;
        }
      });
    }
  }

  render() {
    return this.state.categoriesLoaded ? (
      <List>{this.state.categoriesList}</List>
    ) : (
      <CircularProgress className="align-self-center" />
    );
  }
}

MenuContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MenuContainer)
);
