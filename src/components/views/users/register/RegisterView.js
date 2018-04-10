import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import { FormControl, FormLabel } from "material-ui/Form";
import Input from "material-ui/Input";
import mapValues from "lodash/mapValues";

import "./index.scss";
import TextInput from "../../../commons/input/TextInput";

const helpersText = {
  fname: "You must provide First name",
  mname: "You must provide Middle name",
  lname: "You must provide Last name",
  password: "You must provide a Password",
  email: "You must provide an Email",
  validEmail: "You must provide a valid Email"
};

const initialState = {
  snackbar: {
    open: false,
    message: ""
  },
  submitDisabled: true
};

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.user = {
      fname: "",
      lname: "",
      password: "",
      mname: "",
      image: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.setState({
      snackbar: {
        open: this.props.openSnackbar,
        message: this.props.snackbarMessage
      }
    });
  }

  componentWillUpdate(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        snackbar: {
          open: nextProps.openSnackbar,
          message: nextProps.snackbarMessage
        }
      });
    }
  }

  closeSnackbar() {
    this.setState({ snackbar: { open: false, message: "" } });
  }

  submit(evt) {
    evt.preventDefault();
    this.props.submit(this.user);
  }

  handleChange(field) {
    this.user[field.name] = field.value;
    let sw = 0;
    mapValues(this.user, value => {
      if (value === "") {
        sw++;
      }
    });
    if (sw <= 1) {
      this.setState({ submitDisabled: false });
    }
  }

  render() {
    const { snackbar } = this.state;
    return (
      <div className="Register-wrapper">
        <div className="Login-inner">
          <Paper elevation={6}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <div className="Login-header">
                  <h1 className="Login-title">React Vimeo</h1>
                </div>
                <form className="Login-form">
                  <div className="form-control">
                    <TextInput
                      label="First Name"
                      id="fname"
                      name="fname"
                      onChange={field => this.handleChange(field)}
                      errorText={helpersText.fname}
                      fullWidth
                      validateRules="required"
                    />
                  </div>
                  <div className="form-control">
                    <TextInput
                      label="Middle Name"
                      id="mname"
                      name="mname"
                      onChange={field => this.handleChange(field)}
                      errorText={helpersText.mname}
                      validateRules="required"
                      fullWidth
                    />
                  </div>
                  <div className="form-control">
                    <TextInput
                      label="Last Name"
                      id="lname"
                      name="lname"
                      onChange={field => this.handleChange(field)}
                      errorText={helpersText.lname}
                      validateRules="required"
                      fullWidth
                    />
                  </div>
                  <div className="form-control">
                    <TextInput
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      onChange={field => this.handleChange(field)}
                      errorText={helpersText.password}
                      validateRules="required"
                      fullWidth
                    />
                  </div>
                  <div className="form-control">
                    <TextInput
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      validateRules={["required", "email"]}
                      errorText={[helpersText.email, helpersText.validEmail]}
                      fullWidth
                      onChange={field => this.handleChange(field)}
                    />
                  </div>
                  <div className="form-control">
                    <FormControl fullWidth>
                      <FormLabel htmlFor="image">Image</FormLabel>
                      <Input
                        type="file"
                        name="image"
                        id="image"
                        inputProps={{ accept: ".jpeg,.jpg,.gif,.png" }}
                        onChange={evt =>
                          (this.user.image = evt.target.files[0])
                        }
                        fullWidth
                      />
                    </FormControl>
                  </div>
                  <div className="form-control form-control--submit">
                    <Button
                      onClick={this.submit}
                      variant="raised"
                      color="primary"
                      fullWidth
                      disabled={this.state.submitDisabled}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3500}
            onClose={this.closeSnackbar}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            message={<span>{snackbar.message}</span>}
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

RegisterView.propTypes = {
  submit: PropTypes.func.isRequired,
  openSnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired
};

export default RegisterView;
