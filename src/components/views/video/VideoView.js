import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

import './index.scss';

class VideoView extends React.Component {
  render() {
    return (
      <div className="Video__wrapper">
        {this.props.sasss}
        {!this.props.loaded ? (
          <CircularProgress className="align-self-center" />
        ) : (
          <React.Fragment>
            <div
              className="Video__embed"
              dangerouslySetInnerHTML={{ __html: this.props.video.embed.html }}
            />
            <Typography variant="display2" align="left">
              {this.props.video.name}
            </Typography>
            <div className="Video__meta">
              <div className="Video__Date">
                <Typography align="left">
                  Created {moment(this.props.video.created_time).fromNow()}
                </Typography>
              </div>
              <div className="Video__author">
                <Avatar
                  component="span"
                  className="User__Avatar"
                  alt={this.props.video.user.name}
                  src={this.props.video.user.pictures.sizes[0].link}
                />
                <span className="User__Name">
                  <a href={this.props.video.user.link}>
                    {this.props.video.user.name}
                  </a>
                </span>
              </div>
            </div>
            <Divider className="Divider" />
            <div className="Video__Description">
              <Typography align="left">
                {this.props.video.description}
              </Typography>
            </div>
            <Divider className="Divider" />
            <div className="Video__Comments">{this.props.children}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

VideoView.propTypes = {
  video: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default VideoView;
