import React, { Component } from "react";
import Entry from "./Entry";
import NewEntry from "./NewEntry";
import { graphql } from "react-apollo/index";
import { entriesQuery } from "../constants/Queries";

class EntryList extends Component {
  render() {
    const { loading, entries, error } = this.props.data;
    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return (
        <div>
          <h1>ERROR:</h1>
          <div>{error}</div>
        </div>
      );
    }

    return (
      <div className="entry-list">
        <NewEntry />
        {entries.map(entry => <Entry key={entry.id} entry={entry} />)}
      </div>
    );
  }
}

export default graphql(entriesQuery, {
  // options: { pollInterval: 5000 }
})(EntryList);
