import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import {
  ListItem,
  ListItemEndDetail,
  ListItemStartDetail,
  ListItemText
} from "rmwc/List";
import { Icon } from "rmwc/Icon";

export default class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    editEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  edit = () => {
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
      element = entry.text;
    }

    return (
      <ListItem>
        <ListItemStartDetail>
          <Icon onClick={() => this.edit(entry.id)}>edit</Icon>
        </ListItemStartDetail>
        <ListItemText>{element}</ListItemText>
        <ListItemEndDetail>
          <Icon onClick={() => deleteEntry(entry.id)}>delete</Icon>
        </ListItemEndDetail>
      </ListItem>
    );
  }
}
