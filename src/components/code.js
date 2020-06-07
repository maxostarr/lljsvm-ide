import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { VMContext } from "../utils/vm-context";

import CodeLine from "./code-line";

import {
  instructionLookupTable,
  registerLookupTable
} from "../utils/lookup-table";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    fontFamily: "Roboto Mono",
    minWidth: 450,
    display: "flex",
    flexDirection: "column"
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
  },
  controls: {
    display: "flex",
    marginTop: 0,
    marginBottom: 10
  }
}));

const getRegisterName = (memory, i) => {
  const register = registerLookupTable.find(({ name, number }) => {
    return memory.getUint8(i).toString(16) === number.toString(16);
  });

  return register.name;
};

const Code = () => {
  const [breakpoints, setBreakpoints] = useState([]);
  const [startAddress, setStartAddress] = useState("0");
  const [endAddress, setEndAddress] = useState("0100");
  const { memory, ip, setIsRunning } = useContext(VMContext);
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

  const handleChange = event => {
    if (event.target.id === "start") {
      setStartAddress(event.target.value);
    } else {
      setEndAddress(event.target.value);
    }
  };

  let zeroCount = 0;
  let parsed = [];
  for (let i = parseInt(startAddress, 16); i < parseInt(endAddress, 16); i++) {
    const opCodeRead = memory.getUint8(i);
    const address = i;
    if (opCodeRead === 0x00) {
      zeroCount++;
      if (zeroCount === 5) {
        parsed.push(<div key={address} className={classes.divider}></div>);
      }
      continue;
    }
    zeroCount = 0;
    const instruction = instructionLookupTable.find(
      ({ opCode }) => opCode === opCodeRead
    );

    if (!instruction) {
      continue;
    }

    let instructionProbablyData = false;
    const args = instruction.args.map(({ length, type }) => {
      if (length / 8 === 1) {
        if (type === "register") {
          i++;
          try {
            return getRegisterName(memory, i);
          } catch (ex) {
            // probably tried to parse data as code, just abandon ship
            // left this an X in case you want the option to render it as
            // an "instruction" anyway (could be useful for weird polymorphic
            // programs)
            instructionProbablyData = true;
            return 'X';
          }
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

    if (instructionProbablyData) {
      continue;
    }

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
      <h3 className={classes.h3}>Assembly Code</h3>
      <div className={classes.controls}>
        <TextField
          id="start"
          className={classes.controls}
          label="First Address"
          margin="dense"
          variant="outlined"
          value={startAddress}
          onChange={handleChange}
        />
        <TextField
          id="end"
          className={classes.controls}
          label="Final Address"
          margin="dense"
          variant="outlined"
          value={endAddress}
          onChange={handleChange}
        />
      </div>
      {parsed}
    </Paper>
  );
};

export default Code;
