import React, { Component } from "react";
import { TextField } from "rmwc/TextField/index";
import { Button } from "rmwc/Button/index";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    return this.login(this.state.email, this.state.password)
      .then(() => {
        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
      })
      .catch(error => {
        alert(error);
      });
  };

  login(email, password) {
    const userPool = new CognitoUserPool({
      // Replaced during the build by config/env.js
      UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: () => resolve(),
        onFailure: err => reject(err)
      })
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              autoFocus
              id="email"
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button raised disabled={!this.validateForm()} type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
