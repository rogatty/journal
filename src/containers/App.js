import React, { Component } from "react";
import { Typography } from "rmwc/Typography";
import Routes from "../Routes";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Typography use="display2">Dziennik</Typography>
        <Routes />
      </div>
    );
  }
}

export default App;
