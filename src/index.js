import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import App from "./containers/App";
import { signedFetch } from "./libs/awsLib";

import "material-components-web/dist/material-components-web.css";
import "./index.css";

const httpLink = createHttpLink({
  fetch: signedFetch
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const render = () => {
  ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
        <AppContainer>
          <App />
        </AppContainer>
      </ApolloProvider>
    </Router>,
    document.getElementById("root")
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./containers/App", () => {
    render(App);
  });
}
