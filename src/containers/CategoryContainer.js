import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

import CategoryVideosView from "../components/views/category/CategoryVideosView";
import {
  fetchCategoryVideos,
  setCategoryVideos
} from "../store/actions/category.actions";

const mapStateToProps = ({ category }) => ({
  store: {
    categoryVideos: category.categoryVideos,
    activeCategory: category.activeCategory
  }
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchCategoryVideos: (categoryUri, page, perPage) =>
      dispatch(fetchCategoryVideos(categoryUri, page, perPage)),
    setCategoryVideos: videos => dispatch(setCategoryVideos)
  }
});

const initialState = {
  loaded: false
};

class CategoryVideosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.store.activeCategory.uri === this.props.match.url) {
      this.props.actions
        .fetchCategoryVideos(this.props.match.url, 1)
        .then(uri => {
          if (this.props.match.url === uri) {
            this.setState({ loaded: true });
          }
        });
    }
  }

  handlePageChange(nextPage) {
    this.setState({ loaded: false });
    if (this.props.match.url === "/") {
      this.props.actions
        .fetchCategoryVideos(this.props.store.activeCategory.uri, nextPage)
        .then(() => {
          this.setState({ loaded: true });
        });
    } else {
      this.props.actions
        .fetchCategoryVideos(this.props.match.url, nextPage)
        .then(() => {
          this.setState({ loaded: true });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (
        this.props.store.activeCategory.uri !==
        prevProps.store.activeCategory.uri
      ) {
        if (this.props.match.url === "/") {
          this.props.actions
            .fetchCategoryVideos(this.props.store.activeCategory.uri)
            .then(uri => {
              if (uri === this.props.store.activeCategory.uri) {
                this.setState({ loaded: true });
              }
            });
        } else {
          this.props.actions
            .fetchCategoryVideos(this.props.match.url)
            .then(uri => {
              if (uri === this.props.store.activeCategory.uri) {
                this.setState({ loaded: true });
              }
            });
        }
      }
    }
  }

  // Change this to getDerivedStateFromProps hook
  componentWillUpdate(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      if (
        nextProps.store.activeCategory.uri !==
        this.props.store.activeCategory.uri
      ) {
        this.setState({ loaded: false });
      }
    }
  }

  render() {
    return (
      <CategoryVideosView
        videos={this.props.store.categoryVideos.data}
        areVideosLoaded={this.state.loaded}
      >
        {this.props.store.activeCategory.name}
        <Pagination
          hideDisabled
          activePage={this.props.store.categoryVideos.page}
          onChange={this.handlePageChange}
          itemsCountPerPage={this.props.store.categoryVideos.per_page}
          totalItemsCount={this.props.store.categoryVideos.total}
          pageRangeDisplayed={5}
          itemClass="Pagination__item"
          innerClass="Pagination"
          activeClass="Pagination__item--active"
          activeLinkClass="Pagination__link--active"
          linkClass="Pagination__link"
          firstPageText="First"
          lastPageText="Last"
          nextPageText="Next"
          prevPageText="Prev"
        />
      </CategoryVideosView>
    );
  }
}

CategoryVideosContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isHome: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryVideosContainer
);
