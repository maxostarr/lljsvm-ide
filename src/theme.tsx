import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    ip: Palette["primary"];
  }
  interface PaletteOptions {
    ip: PaletteOptions["primary"];
  }
}

export default createMuiTheme({
  palette: {
    type: "dark",
    ip: {
      main: green[500],
    },
  },
});
