import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import momment from "moment";
import Avatar from "material-ui/Avatar";

import "./Comments.scss";

const Comment = ({ comment }) => {
  return (
    <div className="Comment__wrapper">
      <div className="Comment__Avatar">
        <Avatar
          component="span"
          className="User__Avatar--bg"
          alt={comment.user.name}
          src={comment.user.pictures.sizes[1].link}
        />
      </div>
      <div className="Comment__Info">
        <Typography className="Comment__User" variant="subheading">
          {comment.user.name}
          <Typography
            variant="caption"
            className="Comment__Date"
            component="span"
          >
            {momment(comment.created_on).fromNow()}
          </Typography>
        </Typography>

        <div className="Comment__Text">
          <Typography>{comment.text}</Typography>
        </div>
      </div>
    </div>
  );
};

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.CommentsList = [];
  }

  componentWillMount() {
    this.props.comments.forEach((comment, index) => {
      this.CommentsList.push(<Comment key={index} comment={comment} />);
    });
  }

  render() {
    return (
      <div className="Comments__Wrapper">
        <Typography align="left" variant="headline">
          Comments
        </Typography>
        {this.props.loaded ? (
          this.CommentsList
        ) : (
          <CircularProgress className="align-self-center" />
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  loaded: PropTypes.bool,
  comments: PropTypes.array
};

export default Comments;
