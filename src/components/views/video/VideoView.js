import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import moment from "moment";

import "./index.scss";
import Comments from "./Comments";

class VideoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      video: {}
    };
  }

  render() {
    return (
      <div className="Video__wrapper">
        {!this.state.loaded ? (
          <CircularProgress className="align-self-center" />
        ) : (
          <React.Fragment>
            <div
              className="Video__embed"
              dangerouslySetInnerHTML={{ __html: this.video.embed.html }}
            />
            <Typography variant="display2" align="left">
              {this.video.name}
            </Typography>
            <div className="Video__meta">
              <div className="Video__Date">
                <Typography align="left">
                  Created {moment(this.video.created_time).fromNow()}
                </Typography>
              </div>
              <div className="Video__author">
                <Avatar
                  component="span"
                  className="User__Avatar"
                  alt={this.video.user.name}
                  src={this.video.user.pictures.sizes[0].link}
                />
                <span className="User__Name">
                  <a href={this.video.user.link}>{this.video.user.name}</a>
                </span>
              </div>
            </div>
            <Divider className="Divider" />
            <div className="Video__Description">
              <Typography align="left">{this.video.description}</Typography>
            </div>
            <Divider className="Divider" />
            <div className="Video__Comments">
              <Comments axios={this.props.axios} video={this.props.videoId} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

VideoView.propTypes = {
  videoId: PropTypes.string.isRequired
};

export default VideoView;
