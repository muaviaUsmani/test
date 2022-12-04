import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import reducers from "./reducers"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from "./App"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedHome = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(
  <Router>
    <HotHome />
  </Router>
, document.getElementById("app"))
