import React, { Component } from "react";
import PropTypes from "prop-types";
import Entry from "./Entry";
import { List } from "rmwc/List/index";

export default class EntryList extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { entries, actions } = this.props;

    return (
      <List>
        {entries.map(entry => (
          <Entry key={entry.id} entry={entry} {...actions} />
        ))}
      </List>
    );
  }
}
