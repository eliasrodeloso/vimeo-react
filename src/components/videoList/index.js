import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";

import "./index.scss";
import VideoListPage from "./VideoListPage";

const mapStateToProps = state => {
  return {
    activeCategory: state.category
  };
};

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.videos = {};
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      const { axios, activeCategory } = nextProps;
      axios.get(`${activeCategory.uri}/videos`).then(response => {
        if (response.status === 200) {
          this.videos = response.data;
          console.log(this.videos);
          this.setState({ loaded: true });
        }
      });
    }
    return true;
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
          {this.props.activeCategory.name}
        </Typography>
        <VideoListPage videos={this.videos.data} />
      </div>
    );
  }
}

VideoList.propTypes = {
  axios: PropTypes.func
};

export default connect(mapStateToProps, null)(VideoList);
