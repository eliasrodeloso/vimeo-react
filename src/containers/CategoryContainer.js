import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CategoryVideosView from "../components/views/category/CategoryVideosView";
import { fetchCategoryVideos } from "../store/actions/category.actions";

const mapStateToProps = ({ category }) => ({
  store: {
    categoryVideos: category.categoryVideos,
    activeCategory: category.activeCategory
  }
});

const mapDispatchToProps = dispatch => ({
  fetchCategoryVideos: (categoryUri, page, perPage) =>
    dispatch(fetchCategoryVideos(categoryUri, page, perPage))
});

class CategoryVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      nextPage: 1
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const { activeCategory } = this.props.store;
      if (
        JSON.stringify(activeCategory) !==
        JSON.stringify(prevProps.store.activeCategory)
      ) {
        console.log("It's gonna start to fetch");
        this.props.fetchCategoryVideos(activeCategory.uri, this.state.nextPage);
      }
    }
  }

  render() {
    return <div>{this.props.store.activeCategory.name}</div>;
  }
}

CategoryVideosContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryVideosContainer
);
