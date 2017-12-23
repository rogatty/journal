import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField } from "rmwc/TextField";

export default class TextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    newEntry: PropTypes.bool
  };

  state = {
    text: this.props.text || ""
  };

  handleSubmit = e => {
    if (e.which === 13) {
      const text = e.target.value.trim();

      this.props.onSave(text);

      if (this.props.newEntry) {
        this.setState({ text: "" });
      }
    }
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <TextField
        label={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
