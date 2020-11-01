import React, { useContext, useState } from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { MemoryLine } from "./memoryLine";

import { VMContext } from "../../utils/vmContext";

const viewMemoryAt = (address: number, memory: any) => {
  const bytes = Array.from({ length: 8 }, (_, i) => {
    const v = memory.getUint8(address + i);
    return `0x${v.toString(16).padStart(2, "0")}`;
  });
  // return { blockStart: address.toString(16).padStart(4, "0"), bytes: bytes };
  return bytes;
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    title: {
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
      paddingRight: theme.spacing(2),
    },
    memory: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.grey[600],
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const Memory = withStyles(styles)(({ classes }: Props) => {
  const { memory, ip } = useContext(VMContext);
  const [memoryBank, setMemoryBank] = useState(0);

  const memoryLines = Array.from({ length: 16 }, (_, i) => {
    return (
      <MemoryLine
        ip={ip}
        key={(i + memoryBank) * 0x0008}
        address={(i + memoryBank) * 0x0008}
        bytes={viewMemoryAt((i + memoryBank) * 0x0008, memory)}
      />
    );
  });

  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Memory</Typography>
        <ButtonGroup color="primary">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (memoryBank !== 0) {
                setMemoryBank(memoryBank - 0x0080 / 0x0008);
              }
            }}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (memoryBank !== (0xffff - 0x0080 - 0x000f) / 0x0008) {
                setMemoryBank(memoryBank + 0x0080 / 0x0008);
              }
            }}
          >
            Next
          </Button>
        </ButtonGroup>
      </Paper>
      <Card className={classes.memory}>{memoryLines}</Card>
    </div>
  );
});
