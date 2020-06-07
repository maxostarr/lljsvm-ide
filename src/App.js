import React, { useState } from "react";
import Sim from './Sim';
import VMContextProvider, {initVM} from './utils/vm-context';

const states = {
  LOAD_PROGRAM: 0,
  SIMULATOR: 1
};

const ProgramLoader = ({onLoadProgram}) => {
  const [programText, setProgramText] = useState('');

  return (
    <div style={{ margin: 30 }}>
      <h1>Load program</h1>
      <p>
        Paste space-separated machine code values (in decimal) and click "Start VM"
      </p>
      <textarea
        value={programText}
        rows={40}
        cols={100}
        onChange={e => {
          setProgramText(e.target.value);
        }}
      />
      <br/>
      <button
        onClick={() => {
          const bytes = programText.split(' ').map(x => Number(x));
          onLoadProgram(bytes);
        }}
      >Start VM</button>
    </div>
  );
}

function App() {
  const [appState, setAppState] = useState(states.LOAD_PROGRAM);

  switch (appState) {
    case states.LOAD_PROGRAM: return (
      <ProgramLoader
        onLoadProgram={program => {
          initVM(program);
          setAppState(states.SIMULATOR);
        }}
      />
    );

    case states.SIMULATOR: return (
      <VMContextProvider>
        <Sim />
      </VMContextProvider>
    );

    default: return (
      <div>This doesn't make much sense</div>
    )
  }
}

export default App;
