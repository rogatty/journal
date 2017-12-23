import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "material-components-web/dist/material-components-web.css";
import "./index.css";

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    // FIXME this works only for local sls
    uri: "http://localhost:3001/graphql"
  }),
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
