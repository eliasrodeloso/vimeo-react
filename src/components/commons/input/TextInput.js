import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      helperText: "",
      required: false
    };
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let { validateRules } = this.props;
    if (typeof validateRules === "string") {
      validateRules = [validateRules];
    }
    validateRules.forEach(rule => {
      if (rule === "required") {
        this.setState({ required: true });
      }
    });
  }

  handleChange(evt) {
    if (this.validate(evt.target.value)) {
      this.props.onChange({ name: evt.target.name, value: evt.target.value });
    }
  }

  validate(value) {
    let iteration = 0;
    let { validateRules, errorText } = this.props;
    if (typeof validateRules === "string" || typeof errorText === "string") {
      validateRules = [validateRules];
      errorText = [errorText];
    }
    validateRules.forEach((rule, index) => {
      if (rule === "required") {
        this.setState({ required: true });
        if (value === "") {
          this.setState({ error: true });
          this.setState({ helperText: errorText[index] });
          iteration++;
          return false;
        } else {
          this.setState({ error: false });
          this.setState({ helperText: "" });
          return true;
        }
      } else {
        if (iteration < 1) {
          if (rule === "email") {
            if (!reEmail.test(String(value).toLowerCase())) {
              this.setState({ error: true });
              this.setState({ helperText: errorText[index] });
              return false;
            } else {
              this.setState({ error: false });
              this.setState({ helperText: "" });
              return true;
            }
          }
        }
      }
    });
    return true;
  }

  render() {
    return (
      <TextField
        onChange={this.handleChange}
        name={this.props.name}
        id={this.props.id}
        label={this.props.label}
        type={this.props.type}
        required={this.state.required}
        fullWidth={this.props.fullWidth}
        error={this.state.error}
        helperText={this.state.helperText}
      />
    );
  }
}

TextInput.propTypes = {
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  validateRules: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func
};

export default TextInput;
