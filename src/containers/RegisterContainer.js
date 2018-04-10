import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setUser } from "../store/actions/user.actions";
import { RegisterView } from "../components/views/users";
import { doRegister } from "../utils/fake-backend";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setUser }, dispatch)
});
class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      snackbarMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(user) {
    doRegister(user)
      .then(response => {
        if (response.ok) {
          this.props.actions.setUser(response.json.user);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        this.setState({ openSnackbar: true, snackbarMessage: error });
      });
  }

  render() {
    return (
      <React.Fragment>
        <RegisterView
          submit={this.handleSubmit}
          openSnackbar={this.state.openSnackbar}
          snackbarMessage={this.state.snackbarMessage}
        />
      </React.Fragment>
    );
  }
}

RegisterContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(RegisterContainer);
