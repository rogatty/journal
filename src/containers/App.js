import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Toolbar,
  ToolbarIcon,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle
} from "rmwc/Toolbar";
import Routes from "../Routes";
import { authUser, signOutUser } from "../libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  componentDidMount() {
    authUser()
      .then(() => {
        this.userHasAuthenticated(true);
      })
      .catch(error => {
        console.error(error);
        this.props.history.push("/login");
      })
      .finally(() => {
        this.setState({ isAuthenticating: false });
      });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className="app-container">
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection alignStart>
                <ToolbarTitle>Journal</ToolbarTitle>
              </ToolbarSection>
              <ToolbarSection alignEnd>
                {this.state.isAuthenticated ? (
                  <ToolbarIcon
                    use="power_settings_new"
                    onClick={this.handleLogout}
                  />
                ) : (
                  ""
                )}
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
