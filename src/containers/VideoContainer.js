import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchVideo,
  fetchVideoAndComments,
  setVideo,
  setVideoComments
} from "../store/actions/video.actions";
import { setActiveCategory } from "../store/actions/category.actions";
import VideoView from "../components/views/video/VideoView";
import Comments from "../components/views/video/Comments";

const mapStateToProps = ({ video, category }) => ({
  store: {
    video: video.video,
    comments: video.comments,
    activeCategory: category.activeCategory
  }
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchVideo: videoId => {
      dispatch(fetchVideo(videoId));
    },
    fetchVideoAndComments: (videoId, page, perPage) => {
      dispatch(fetchVideoAndComments(videoId, page, perPage));
    },
    setActiveCategory: category => dispatch(setActiveCategory(category)),
    setVideo: video => dispatch(setVideo(video)),
    setComments: comments => dispatch(setVideoComments(comments))
  }
});

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.props.actions.fetchVideoAndComments(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (!this.props.store.activeCategory.uri) {
        this.props.actions.setActiveCategory(
          this.props.store.video.categories[0]
        );
      }
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps.store.comments).length > 0) {
      return { loaded: true };
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    this.props.actions.setVideo({});
    this.props.actions.setComments({});
  }

  render() {
    return (
      <VideoView loaded={this.state.loaded} video={this.props.store.video}>
        <Comments
          loaded={this.state.loaded}
          comments={this.props.store.comments.data}
        />
      </VideoView>
    );
  }
}

VideoContainer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  actions: PropTypes.object,
  store: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
