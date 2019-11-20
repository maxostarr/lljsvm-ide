import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import CodeLine from "./code-line";

import {
  instructionLookupTable,
  registerLookupTable
} from "../utils/lookup-table";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    fontFamily: "Roboto Mono",
    minWidth: 450
  },
  hovered: {
    outline: "solid",
    outlineColor: "gray",
    outlineWidth: 1
  },
  highlighted: {
    outline: "solid",
    outlineColor: theme.palette.ip,
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

const getRegisterName = (memory, i) => {
  const register = registerLookupTable.find(({ name, number }) => {
    return memory.getUint8(i).toString(16) === number.toString(16);
  });

  return register.name;
};

const Code = ({ memory, ip, setIsRunning }) => {
  const [breakpoints, setBreakpoints] = useState([]);
  const classes = useStyles();

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
          i++;
          return getRegisterName(memory, i);
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
      <CodeLine
        key={address}
        toggleBreakpoint={toggleBreakpoint}
        instruction={instruction}
        ip={ip}
        args={args}
        breakpoints={breakpoints}
        address={address}
      />
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
