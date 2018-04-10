import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { LoginView } from "../components/views/users";
import { setUser } from "../store/actions/user.actions";
import { doLogin } from "../utils/fake-backend";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setUser }, dispatch)
});

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      snackbarMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(user) {
    doLogin(user.email, user.password)
      .then(response => {
        if (response.ok) {
          this.props.actions.setUser(response.json);
          this.props.history.push("/")
        }
      })
      .catch(error => {
        this.setState({ openSnackbar: true, snackbarMessage: error });
      });
  }

  render() {
    return (
      <React.Fragment>
        <LoginView
          submit={this.handleSubmit}
          openSnackbar={this.state.openSnackbar}
          snackbarMessage={this.state.snackbarMessage}
        />
      </React.Fragment>
    );
  }
}

LoginContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
