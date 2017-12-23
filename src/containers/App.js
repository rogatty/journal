import React, { Component } from "react";
import EntryList from "../components/EntryList";
import { Typography } from "rmwc/Typography";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Typography use="display2">Dziennik</Typography>
        <EntryList />
      </div>
    );
  }
}

export default App;
