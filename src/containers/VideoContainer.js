import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchVideo,
  fetchVideoAndComments
} from "../store/actions/video.actions";
import VideoView from "../components/views/video/VideoView";
import Comments from "../components/views/video/Comments";

const mapStateToProps = ({ video }) => ({
  store: { video: video.video, comments: video.comments }
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchVideo: videoId => {
      dispatch(fetchVideo(videoId));
    },
    fetchVideoAndComments: (videoId, page, perPage) => {
      dispatch(fetchVideoAndComments(videoId, page, perPage));
    }
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

  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps.store.comments).length > 0) {
      return { loaded: true };
    } else {
      return null;
    }
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
