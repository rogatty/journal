import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "rmwc";
import TextInput from "./TextInput";

export default class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    editEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteEntry(id);
    } else {
      this.props.editEntry(id, text);
    }
    this.setState({ editing: false });
  };

  render() {
    const { entry, deleteEntry } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TextInput
          text={entry.text}
          onSave={text => this.handleSave(entry.id, text)}
        />
      );
    } else {
      element = (
        <div className="entry">
          <label onDoubleClick={this.handleDoubleClick}>{entry.text}</label>
          <Button onClick={() => deleteEntry(entry.id)}>
            <i className="material-icons">delete</i>
          </Button>
        </div>
      );
    }

    return (
      <li
        className={classnames({
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
