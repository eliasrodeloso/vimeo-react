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
    this.state = {
      loaded: false,
      commentsPage: 1
    };
    this.comments = {};
    this.loadComments = this.loadComments.bind(this);
    this.buildFlatList = this.buildFlatList.bind(this);
    this.CommentsList = [];
  }

  loadComments() {
    const { axios, video } = this.props;
    axios
      .get(
        `/videos/${video}/comments?page=${this.state.commentsPage}&per_page=10`
      )
      .then(response => {
        if (response.status === 200) {
          this.comments = response.data;
          this.buildFlatList();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  buildFlatList() {
    const length = this.comments.data.length - 1;
    this.comments.data.forEach((comment, index) => {
      this.CommentsList.push(<Comment key={index} comment={comment} />);
      if (index === length) {
        this.setState({ loaded: true });
      }
    });
  }

  componentDidMount() {
    this.loadComments();
  }

  render() {
    return (
      <div className="Comments__Wrapper">
        <Typography align="left" variant="headline">
          Comments
        </Typography>
        {this.state.loaded ? (
          this.CommentsList
        ) : (
          <CircularProgress className="align-self-center" />
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  axios: PropTypes.func,
  video: PropTypes.string
};

export default Comments;
