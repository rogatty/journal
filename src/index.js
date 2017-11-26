import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App";
import reducer from "./reducers/index";
import "material-components-web/dist/material-components-web.css";
import "./index.css";

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
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
