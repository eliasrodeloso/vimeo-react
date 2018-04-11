import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";

import "./index.scss";
import VideoListPage from "./VideoListPage";

class CategoryVideosView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography
          className="VideoList__title"
          align="left"
          variant="headline"
        >
          {this.props.children[0]}
        </Typography>
        <Divider />
        <div className="VideoList__wrapper">
          {!this.props.areVideosLoaded ? (
            <CircularProgress className="align-self-center" />
          ) : (
            <VideoListPage videos={this.props.videos} />
          )}
        </div>
        <Divider />
        <div className="Pagination__wrapper">{this.props.children[1]}</div>
      </React.Fragment>
    );
  }
}

CategoryVideosView.propTypes = {
  areVideosLoaded: PropTypes.bool.isRequired,
  videos: PropTypes.array
};

export default CategoryVideosView;
