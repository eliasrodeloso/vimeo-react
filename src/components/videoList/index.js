import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";

import "./index.scss";

class VideoList extends React.Component {
  componentWillMount() {
    const { axios, category } = this.props
    axios.get(`${category.uri}`).then()
  }

  render() {
    return (
      <div>
        <Typography className="VideoList__title" variant="headline">
          {this.props.category.name}
        </Typography>
      </div>
    );
  }
}

VideoList.propTypes = {
  category: PropTypes.object,
  axios: PropTypes.func
};

export default VideoList;
