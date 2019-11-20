
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import lime from "@material-ui/core/colors/lime";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";

import VMContextProvider, { VMContext } from "./utils/vm-context";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    secondary: lime,
    ip: purple[300],
    sp: red[500],
    fp: green[500]
  }
});

function Themed() {
  return (
    <ThemeProvider theme={theme}>
      <VMContextProvider>
        <App />
      </VMContextProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(<Themed />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

