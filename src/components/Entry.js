import React, { Component } from "react";
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
import { compose, graphql } from "react-apollo";
import {
  deleteEntryMutation,
  updateEntryMutation
} from "../constants/Mutations";
import { entriesQuery } from "../constants/Queries";

class Entry extends Component {
  state = {
    isEditing: false
  };

  enableEditMode() {
    this.setState({ isEditing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.deleteEntry(id);
    } else {
      this.updateEntry(id, text);
    }
    this.setState({ isEditing: false });
  }

  deleteEntry(id) {
    this.props.deleteEntry({
      variables: { id },
      refetchQueries: [{ query: entriesQuery }]
    });
  }

  updateEntry(id, content) {
    this.props.updateEntry({
      variables: { id, content },
      refetchQueries: [{ query: entriesQuery }]
    });
  }

  render() {
    let element;

    if (this.state.isEditing) {
      element = (
        <TextInput
          text={this.props.entry.content}
          onSave={content => this.handleSave(this.props.entry.id, content)}
        />
      );
    } else {
      element = this.props.entry.content;
    }

    return (
      <Card className="entry">
        <CardPrimary>
          <CardTitle large>{element}</CardTitle>
        </CardPrimary>
        <CardActions>
          <CardAction>
            <Icon onClick={() => this.enableEditMode()}>edit</Icon>
          </CardAction>
          <CardAction>
            <Icon
              onClick={() => {
                this.deleteEntry(this.props.entry.id);
              }}
            >
              delete
            </Icon>
          </CardAction>
        </CardActions>
      </Card>
    );
  }
}

export default compose(
  graphql(deleteEntryMutation, { name: "deleteEntry" }),
  graphql(updateEntryMutation, { name: "updateEntry" })
)(Entry);
