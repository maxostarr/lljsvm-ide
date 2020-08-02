import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import lightBlue from "@material-ui/core/colors/lightBlue";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    ip: Palette["primary"];
    fp: Palette["primary"];
    sp: Palette["primary"];
  }
  interface PaletteOptions {
    ip: PaletteOptions["primary"];
    fp: PaletteOptions["primary"];
    sp: PaletteOptions["primary"];
  }
}

export default createMuiTheme({
  palette: {
    type: "dark",
    ip: {
      main: green[400],
    },
    fp: {
      main: pink[300],
    },
    sp: {
      main: lightBlue[500],
    },
  },
});
