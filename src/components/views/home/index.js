import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";

import "./index.scss";
import CategoryView from "../category";

const mapStateToProps = state => {
  return {
    activeCategory: state.category
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
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
        <CategoryView />
      </div>
    );
  }
}

Home.propTypes = {
  axios: PropTypes.func
};

export default connect(mapStateToProps, null)(Home);
