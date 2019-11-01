import React from "react";

const registerNames = [
  "ip",
  "acc",
  "r1",
  "r2",
  "r3",
  "r4",
  "r5",
  "r6",
  "r7",
  "r8"
];

function Registers({ cpu }) {
  const registerDisplayElems = registerNames.map((name, index) => {
    return (
      <div key={index}>
        {name}:{" "}
        {cpu
          .getRegister(name)
          .toString(16)
          .padStart(4, "0")}
      </div>
    );
  });
  return <div className="Registers">{registerDisplayElems}</div>;
}

export default Registers;
