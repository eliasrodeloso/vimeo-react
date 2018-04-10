import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Snackbar from "material-ui/Snackbar";
import { Link } from "react-router-dom";

import "./index.scss";
import { doLogin } from "../../../utils/fake-backend";
import { setUser } from "../../../store/actions/user.actions";

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

const helpersText = {
  Email: "The Email field must not be empty",
  password: "The password field must not be empty"
};

const initialState = {
  helperTextPassword: "",
  helperTextEmail: "",
  errorPassword: false,
  errorEmail: false,
  openSnackbar: false,
  snackbarMessage: ""
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.Email = "";
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
      doLogin(this.Email, this.password)
        .then(({ json }) => {
          this.props.setUser(json);
          setTimeout(() => {
            this.props.history.push("/");
          }, 550);
        })
        .catch(error => {
          this.setState({ openSnackbar: true, snackbarMessage: error });
          this.setState({ errorEmail: true, errorPassword: true });
        });
    }
  }

  validate() {
    if (this.Email !== "") {
      this.setState({ errorEmail: false });
    } else {
      this.setState({ errorEmail: true });
      this.setState({ helperTextEmail: helpersText.Email });
    }
    if (this.password !== "") {
      this.setState({ errorEmail: false });
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
      errorEmail,
      helperTextEmail,
      openSnackbar,
      snackbarMessage
    } = this.state;
    console.log(this.props);
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
                      label="Email"
                      id="email"
                      name="email"
                      required
                      onChange={evt => (this.Email = evt.target.value)}
                      error={errorEmail}
                      helperText={helperTextEmail}
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
                  <div className="form-control form-control--centered">
                    <Link to="/users/register">Not registered?</Link>
                  </div>
                  <div className="form-control form-control--centered">
                    <Button
                      onClick={evt => this.submit(evt)}
                      variant="raised"
                      color="primary"
                      size={"large"}
                      fullWidth
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
