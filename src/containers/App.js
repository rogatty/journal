import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NewEntry from "../components/NewEntry";
import EntriesList from "../components/EntryList";
import * as Actions from "../actions";
import { Typography } from "rmwc/Typography";

const App = ({ entries, actions }) => (
  <div className="app-container">
    <Typography use="display2">Dziennik</Typography>
    <NewEntry addEntry={actions.addEntry} />
    <EntriesList entries={entries} actions={actions} />
  </div>
);

App.propTypes = {
  entries: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  entries: state.entries
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
