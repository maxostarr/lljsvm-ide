import React, { useState } from "react";
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
  hovered: {
    outline: "solid",
    outlineColor: "gray",
    outlineWidth: 1
  },
  highlighted: {
    outline: "solid",
    outlineColor: theme.palette.secondary.main,
    outlineWidth: 1
    // backgroundColor: theme.palette.secondary[900]
  },
  highlightedPrimary: {
    outline: "solid",
    outlineColor: theme.palette.error.main,
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

const Code = ({ memory, ip, setIsRunning }) => {
  const [breakpoints, setBreakpoints] = useState([]);
  const [hoveredItem, setHoveredItem] = useState();

  const toggleBreakpoint = address => {
    if (breakpoints.includes(address)) {
      setBreakpoints(breakpoints.filter(item => item !== address));
      return;
    }
    setBreakpoints([address, ...breakpoints]);
  };

  if (breakpoints.includes(ip)) {
    setIsRunning(false);
  }

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
      <div
        onMouseEnter={() => {
          setHoveredItem(address);
        }}
        onMouseLeave={() => {
          setHoveredItem(null);
        }}
        key={address}
        onClick={e => {
          toggleBreakpoint(address);
        }}
        className={
          breakpoints.includes(address)
            ? classes.highlightedPrimary
            : ip === address
            ? classes.highlighted
            : hoveredItem === address
            ? classes.hovered
            : " "
        }
      >
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
