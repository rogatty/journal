import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

export default class NewEntry extends Component {
  static propTypes = {
    addEntry: PropTypes.func.isRequired
  };

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addEntry(text);
    }
  };

  render() {
    return (
      <div className="new-entry">
        <TextInput
          onSave={this.handleSave}
          placeholder="Wyraź się"
          newEntry={true}
        />
      </div>
    );
  }
}
