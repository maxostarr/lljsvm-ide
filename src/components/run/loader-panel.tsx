import React, {useState} from 'react';
import { TextField, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    textInput: {
      backgroundColor: '#1e1e1e',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace'
    },
    loadAddress: {
      backgroundColor: '#1e1e1e',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      color: 'white'
    }
  });

interface LoaderPanelProps extends WithStyles<typeof styles> {
  loaderData: number[];
  loaderAddress: number;
  setLoaderData: Function;
  setLoaderAddress: Function;
}

const hexValidator = /^(?:[a-f0-9]{2}\s+)*[a-f0-9]{2}$/i;
const addressValidator = /^(?:[a-f0-9]{1,4})?$/i;

const LoaderPanel = withStyles(styles)(({ loaderData, setLoaderData, loaderAddress, setLoaderAddress, classes }: LoaderPanelProps) => {
  const [dataString, setDataString] = useState(loaderData.map(x => x.toString(16).padStart(2, '0')).join(' '));
  const [addressString, setAddressString] = useState(loaderAddress.toString(16).padStart(4, '0'));

  return (
    <>
      <TextField
        error={false}
        className={classes.textInput}
        multiline
        rows={16}
        defaultValue={dataString}
        style={{ marginTop: '5px'}}
        onChange={e => {
          setDataString(e.target.value);

          if (hexValidator.test(e.target.value)) {
            setLoaderData(e.target.value.split(/\s/).map(x => parseInt(x, 16)));
          }
        }}
      />
      <TextField
        className={classes.loadAddress}
        label="Load Address (hexadecimal)"
        onChange={e => {
          const addrTrimmed = e.target.value.trim();
          if (addrTrimmed === '' || addressValidator.test(addrTrimmed)) {
            setAddressString(addrTrimmed);
            setLoaderAddress(parseInt(addrTrimmed, 16));
          }
        }}
        value={addressString}
      />
    </>
  )
});

export default LoaderPanel;