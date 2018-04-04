import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Snackbar from "material-ui/Snackbar";

import "./index.scss";
import { doLogin } from "../../../utils/fake-backend";
import { setUser } from "../../../store/actions/user.actions";

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

const helpersText = {
  username: "The username field must not be empty",
  password: "The password field must not be empty"
};

const initialState = {
  helperTextPassword: "",
  helperTextUsername: "",
  errorPassword: false,
  errorUsername: false,
  openSnackbar: false,
  snackbarMessage: ""
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.username = "";
    this.password = "";
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  static contextType = {
    router: PropTypes.object
  };

  closeSnackbar() {
    this.setState({ openSnackbar: false });
  }

  submit(evt) {
    evt.preventDefault();
    if (this.validate()) {
      doLogin(this.username, this.password)
        .then(({ json }) => {
          this.props.setUser(json);
          setTimeout(() => {
            this.props.history.push("/");
          }, 550);
        })
        .catch(error => {
          this.setState({ openSnackbar: true, snackbarMessage: error });
          this.setState({ errorUsername: true, errorPassword: true });
        });
    }
  }

  validate() {
    if (this.username !== "") {
      this.setState({ errorUsername: false });
    } else {
      this.setState({ errorUsername: true });
      this.setState({ helperTextUsername: helpersText.username });
    }
    if (this.password !== "") {
      this.setState({ errorUsername: false });
      return true;
    } else {
      this.setState({ errorPassword: true });
      this.setState({ helperTextPassword: helpersText.password });
    }
    return false;
  }

  render() {
    const {
      helperTextPassword,
      errorPassword,
      errorUsername,
      helperTextUsername,
      openSnackbar,
      snackbarMessage
    } = this.state;
    return (
      <div className="Login-wrapper">
        <div className="Login-inner">
          <Paper elevation={6}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <div className="Login-header">
                  <h1 className="Login-title">React Vimeo</h1>
                </div>
                <form className="Login-form">
                  <div className="form-control">
                    <TextField
                      label="Username"
                      id="username"
                      name="username"
                      required
                      onChange={evt => (this.username = evt.target.value)}
                      error={errorUsername}
                      helperText={helperTextUsername}
                      fullWidth
                    />
                  </div>
                  <div className="form-control">
                    <TextField
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      required
                      onChange={evt => (this.password = evt.target.value)}
                      error={errorPassword}
                      helperText={helperTextPassword}
                      fullWidth
                    />
                  </div>
                  <div className="form-control form-control--submit">
                    <Button
                      onClick={evt => this.submit(evt)}
                      variant="raised"
                      color="primary"
                      size="large"
                    >
                      SUBMIT
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3500}
            onClose={this.closeSnackbar}
            anchorOrigin={{
              horizontal: "right",
              vertical: "top"
            }}
            message={<span>{snackbarMessage}</span>}
            action={
              <Button color="inherit" size="small" onClick={this.closeSnackbar}>
                GOT IT!
              </Button>
            }
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Login);
