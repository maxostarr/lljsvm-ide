import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    fontFamily: "Roboto Mono",
    minWidth: 450,
  },
  hovered: {
    outline: "solid",
    outlineColor: "gray",
    outlineWidth: 1,
  },
  currentInstruction: {
    outline: "solid",

    // outlineColor: theme.palette.ip,

    outlineWidth: 1,
    // backgroundColor: theme.palette.secondary[900]
  },
  breakpoint: {
    outline: "solid",
    outlineColor: theme.palette.error.main,
    outlineWidth: 1,
    // backgroundColor: theme.palette.secondary[900]
  },
  divider: {
    width: 400,
    borderBottom: "solid",
    borderWidth: 0.5,
    borderColor: "black",
    height: 0.5,
    color: "gray",
  },
}));

interface Props {
  instruction: any;
  ip: number;
  address: number;
  args: any;
  breakpoints: number[];
  toggleBreakpoint: any;
}

const CodeLine = ({
  instruction,
  ip,
  address,
  args,
  breakpoints,
  toggleBreakpoint,
}: Props) => {
  const [hoveredItem, setHoveredItem] = useState((null as unknown) as number);
  const classes = useStyles();

  return (
    <div
      key={address}
      onClick={(e) => {
        toggleBreakpoint(address);
      }}
      onMouseEnter={() => {
        setHoveredItem(address);
      }}
      onMouseLeave={() => {
        setHoveredItem((null as unknown) as number);
      }}
      className={
        breakpoints.includes(address)
          ? classes.breakpoint
          : ip === address
          ? classes.currentInstruction
          : hoveredItem === address
          ? classes.hovered
          : " "
      }
    >
      {"0x" + address.toString(16).padStart(4, "0")}:{" "}
      <span>{instruction.name.padEnd(12, "\u00a0")} </span>
      {args.map((arg: string) => !arg ? '' : (
        <span key={arg}>{arg.padEnd(8, "\u00a0")}</span>
      ))}
    </div>
  );
};

export default CodeLine;
