import React from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    title: {
      // height: "1fc"
      padding: theme.spacing(1)
    },
    output: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[600]
    }
  });

interface Props extends WithStyles<typeof styles> {}

export const Editor = withStyles(styles)(({ classes }: Props) => {
  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Editor</Typography>
      </Paper>
      <Card className={classes.output}></Card>
    </div>
  );
});
