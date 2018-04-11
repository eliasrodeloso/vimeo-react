import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import Pagination from "react-js-pagination";

import "./index.scss";
import VideoListPage from "./VideoListPage";

class CategoryVideosView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      nextPage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.categoryVideos = [];
  }

  handlePageChange(nextPage) {
    if (nextPage !== this.categoryVideos.page) {
      this.setState({ loaded: false });
      this.setState({ nextPage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let notSameProps = JSON.stringify(prevProps) !== JSON.stringify(this.props);

    if (notSameProps) {
      // Start to load the videos for the category
      this.setState({ loaded: false, nextPage: 1 });
    } else {
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

CategoryVideosView.propTypes = {
  isHome: PropTypes.bool
};

export default CategoryVideosView;
