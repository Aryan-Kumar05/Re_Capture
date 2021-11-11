// where we will connect react file to index.html
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {Provider} from "react-redux";
import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers"; //imports index.js file from reducers
import "./index.css";

//refer notes for meaning
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}> {/*The single Redux store in your application.*/}
     <App />
  </Provider>,
  document.getElementById("root"));
