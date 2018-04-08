import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import Pagination from "react-js-pagination";

import "./index.scss";
import { setActiveCategory } from "../../../store/actions/category.actions";
import VideoListPage from "../../commons/videoPage";

const mapDispatchToProps = dispatch => {
  return {
    setActiveCategory: category => dispatch(setActiveCategory(category))
  };
};

class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      nextPage: 1
    };
    this.loadVideos = this.loadVideos.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.categoryInfo = {};
    this.category = {};
  }

  loadVideos(uri, page = 1) {
    const { axios } = this.props;
    axios
      .get(`${uri}/videos?page=${this.state.nextPage}&per_page=27`)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.categoryInfo = response.data;
          this.setState({ loaded: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageChange(nextPage) {
    if (nextPage !== this.categoryInfo.page) {
      this.setState({ loaded: false });
      this.setState({ nextPage });
    }
  }

  // called when is accesed trough URL directly
  componentWillMount() {
    let category = {
      uri: this.props.match.url,
      name:
        this.props.match.params.id.charAt(0).toUpperCase() +
        this.props.match.params.id.slice(1)
    };
    this.props.setActiveCategory(category);
    this.category = category;
  }

  // Called when is called because the store changes
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.url !== this.category.uri) {
      let category = {
        uri: nextProps.match.url,
        name:
          nextProps.match.params.id.charAt(0).toUpperCase() +
          nextProps.match.params.id.slice(1)
      };
      this.setState({ loaded: false });
      this.setState({ nextPage: 1 });
      this.props.setActiveCategory(category);
      this.category = category;
    }
  }

  // Call to the API, only when is mounted for the first time and also when changes because of the store
  componentDidMount() {
    this.loadVideos(this.category.uri);
  }

  // Call to the API, when is going to change the page inside the same component
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.loadVideos(this.category.uri);
    } else {
      if (prevState.nextPage !== this.state.nextPage) {
        this.loadVideos(this.category.uri);
      }
    }
  }

  render() {
    return !this.state.loaded ? (
      <CircularProgress className="align-self-center" />
    ) : (
      <div className="VideoList__wrapper">
        <Typography
          className="VideoList__title"
          align="left"
          variant="headline"
        >
          {this.category.name}
        </Typography>
        <VideoListPage videos={this.categoryInfo.data} />
        <Divider />
        <div className="Pagination__wrapper">
          <Pagination
            hideDisabled
            activePage={this.categoryInfo.page}
            onChange={nextPage => this.handlePageChange(nextPage)}
            itemsCountPerPage={this.categoryInfo.per_page}
            totalItemsCount={this.categoryInfo.total}
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
      </div>
    );
  }
}

CategoryView.propTypes = {
  axios: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  setActiveCategory: PropTypes.func
};

export default connect(null, mapDispatchToProps)(CategoryView);
