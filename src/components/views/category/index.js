import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import Pagination from "react-js-pagination";

import "./index.scss";
import { setActiveCategory } from "../../../store/actions/category.actions";
import VideoListPage from "./VideoListPage";

const mapDispatchToProps = dispatch => {
  return {
    setActiveCategory: category => dispatch(setActiveCategory(category))
  };
};

const mapStateToProps = state => ({
  activeCategory: state.category
});

class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      nextPage: 1
    };
    this.loadVideos = this.loadVideos.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.categoryVideos = [];
  }

  loadVideos(uri, page = 1) {
    const { axios } = this.props;
    axios
      .get(`${uri}/videos?page=${this.state.nextPage}&per_page=27`)
      .then(response => {
        if (response.status === 200) {
          this.categoryVideos = response.data;
          this.setState({ loaded: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageChange(nextPage) {
    if (nextPage !== this.categoryVideos.page) {
      this.setState({ loaded: false });
      this.setState({ nextPage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let notSameProps = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    let notSameState = JSON.stringify(prevState) !== JSON.stringify(this.state);
    if (notSameProps) {
      // Start to load the videos for the category
      this.setState({ loaded: false, nextPage: 1 });
      this.loadVideos(this.props.activeCategory.uri);
    } else {
      if (notSameState && !notSameProps) {
        // Load the videos for the next page
        this.loadVideos(this.props.activeCategory.uri);
      }
    }
  }

  componentDidMount() {
    const { activeCategory } = this.props;
    if (Object.keys(activeCategory).length !== 0) {
      this.loadVideos(activeCategory.uri);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography
          className="VideoList__title"
          align="left"
          variant="headline"
        >
          {this.props.activeCategory.name}
        </Typography>
        <Divider />
        <div className="VideoList__wrapper">
          {!this.state.loaded ? (
            <CircularProgress className="align-self-center" />
          ) : (
            <VideoListPage videos={this.categoryVideos.data} />
          )}
        </div>
        <Divider />
        <div className="Pagination__wrapper">
          <Pagination
            hideDisabled
            activePage={this.categoryVideos.page}
            onChange={nextPage => this.handlePageChange(nextPage)}
            itemsCountPerPage={this.categoryVideos.per_page}
            totalItemsCount={this.categoryVideos.total}
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
        </div>
      </React.Fragment>
    );
  }
}

CategoryView.propTypes = {
  axios: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setActiveCategory: PropTypes.func,
  isHome: PropTypes.bool,
  activeCategory: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
