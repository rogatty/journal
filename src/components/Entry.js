import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import { Icon } from "rmwc/Icon";
import {
  Card,
  CardAction,
  CardActions,
  CardPrimary,
  CardSubtitle,
  CardTitle
} from "rmwc/Card/index";

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
      <Card className="entry">
        <CardPrimary>
          <CardTitle large>{element}</CardTitle>
          <CardSubtitle>Igor</CardSubtitle>
        </CardPrimary>
        <CardActions>
          <CardAction>
            <Icon onClick={() => this.edit(entry.id)}>edit</Icon>
          </CardAction>
          <CardAction>
            <Icon onClick={() => deleteEntry(entry.id)}>delete</Icon>
          </CardAction>
        </CardActions>
      </Card>
    );
  }
}
