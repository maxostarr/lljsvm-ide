import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import {
  instructionLookupTable,
  registerLookupTable
} from "../utils/instruction-lut";
import { height } from "dom-helpers";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    fontFamily: "Roboto Mono",
    minWidth: 450
  },
  byte: {
    marginLeft: theme.spacing(1)
  },
  highlighted: {
    outline: "solid",
    outlineColor: theme.palette.secondary.main,
    outlineWidth: 1
    // backgroundColor: theme.palette.secondary[900]
  },
  highlightedPrimary: {
    outline: "solid",
    outlineColor: theme.palette.primary.main,
    outlineWidth: 1
    // backgroundColor: theme.palette.secondary[900]
  },
  h3: {
    marginTop: 0
  },
  divider: {
    width: 400,
    borderBottom: "solid",
    borderWidth: 0.5,
    borderColor: "black",
    height: 0.5,
    color: "gray"
  }
}));

const Code = ({ memory, ip }) => {
  const classes = useStyles();
  let zeroCount = 0;
  let parsed = [];
  for (let i = 0; i < 0x100; i++) {
    const opCodeRead = memory.getUint8(i);
    const address = i;
    if (opCodeRead === 0x00) {
      zeroCount++;
      if (zeroCount === 5) {
        parsed.push(<div className={classes.divider}></div>);
      }
      continue;
    }
    zeroCount = 0;
    const instruction = instructionLookupTable.find(
      ({ opCode }) => opCode === opCodeRead
    );
    const args = instruction.args.map(({ length, type }) => {
      if (length / 8 === 1) {
        if (type === "register") {
          const register = registerLookupTable.find(({ name, number }) => {
            console.log(memory.getUint8(i + 1).toString(16));
            return memory.getUint8(i + 1).toString(16) === number.toString(16);
          });
          i++;
          return register.name;
        }
        return memory
          .getUint8(++i)
          .toString(16)
          .padStart(2, "0");
      }
      if (length / 8 === 2) {
        return (
          "0x" +
          memory
            .getUint8(++i)
            .toString(16)
            .padStart(2, "0") +
          memory
            .getUint8(++i)
            .toString(16)
            .padStart(2, "0")
        );
      }
      return "";
    });
    parsed.push(
      <div id={address} className={ip === address ? classes.highlighted : ""}>
        {"0x" + address.toString(16).padStart(4, "0")}:{" "}
        <span>{instruction.name.padEnd(12, "\u00a0")} </span>
        {args.map(arg => (
          <span>{arg + " "}</span>
        ))}
      </div>
    );
  }
  return (
    <Paper className={classes.root}>
      <h3 className={classes.h3}>Machine Code</h3>
      {parsed}
    </Paper>
  );
};

export default Code;
