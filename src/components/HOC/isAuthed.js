import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default RealComponent => {
  class Authentication extends Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }

    static contextType = {
      router: PropTypes.object
    };

    componentWillMount() {
      // if (!this.props.user.isLogged) {
      //   this.props.history.push("/users/login");
      // }
    }

    shouldComponentUpdate(nextProps) {
      // if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      //   return false;
      // }
      // if (!this.nextProps.user.isLogged) {
      //   this.props.router.history.push("/users/login");
      // }
    }

    render() {
      return <RealComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { user: state.user };
  };

  return connect(mapStateToProps)(Authentication);
};
