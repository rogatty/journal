import React, { Component } from "react";
import { graphql } from "react-apollo";
import { compose } from "react-apollo/index";

import TextInput from "./TextInput";
import { entriesQuery } from "../constants/Queries";
import { createEntryMutation } from "../constants/Mutations";
import { s3Upload } from "../libs/awsLib";

// 10 MB in bytes
const fileSizeLimit = 10485760;

class NewEntry extends Component {
  constructor(props) {
    super(props);

    this.file = null;
  }

  handleFileChange(event) {
    this.file = event.target.files[0];
  }

  async handleSave(text) {
    if (text.length !== 0) {
      if (this.file && this.file.size > fileSizeLimit) {
        alert("Maksymalny rozmiar pliku to 10 MB");
        return;
      }

      this.setState({ isLoading: true });

      try {
        const variables = {
          content: text
        };

        if (this.file) {
          variables.attachments = [
            {
              url: (await s3Upload(this.file)).Location,
              position: 0
            }
          ];
        }

        this.props.createEntry({
          variables,
          refetchQueries: [{ query: entriesQuery }]
        });
      } catch (e) {
        alert(e);
      }
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
        <label className="mdl-button mdl-js-button mdl-button--icon mdl-button--file">
          <i className="material-icons">attach_file</i>
          <input
            type="file"
            id="file"
            onChange={this.handleFileChange.bind(this)}
          />
        </label>
      </div>
    );
  }
}

export default compose(graphql(createEntryMutation, { name: "createEntry" }))(
  NewEntry
);
