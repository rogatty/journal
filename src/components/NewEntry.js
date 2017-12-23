import React, { Component } from "react";
import TextInput from "./TextInput";
import { graphql } from "react-apollo";
import { entriesQuery } from "../constants/Queries";
import { createEntryMutation } from "../constants/Mutations";
import { compose } from "react-apollo/index";

class NewEntry extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.createEntry({
        variables: { content: text },
        refetchQueries: [{ query: entriesQuery }]
      });
    }
  }

  render() {
    return (
      <div className="new-entry">
        <TextInput
          onSave={this.handleSave.bind(this)}
          placeholder="Wyraź się"
          newEntry={true}
        />
      </div>
    );
  }
}

export default compose(graphql(createEntryMutation, { name: "createEntry" }))(
  NewEntry
);
