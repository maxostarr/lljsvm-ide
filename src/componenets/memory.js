import React from "react";
import "./memory.css";
const viewMemoryAt = (address, memory) => {
  // 0x0f01: 0x04 0x05 0xA3 0xFE 0x13 0x0D 0x44 0x0F
  const bytes = Array.from({ length: 8 }, (_, i) => {
    const v = memory.getUint8(address + i);
    return {
      address: address + i,
      value: `0x${v.toString(16).padStart(2, "0")}`
    };
  });
  // .map(v => {

  // });
  return { blockStart: address.toString(16).padStart(4, "0"), bytes: bytes };
  // return `0x${address.toString(16).padStart(4, "0")}: ${nextEightBytes.join(
  //   " "
  // )}`;
};

function Memory({ memory }) {
  // let displayBytes = [];
  // for (let i = 0; i <= 0x0100; i += 0x0010) {
  //   const bytes = viewMemoryAt(i, memory);
  //   console.log(bytes.blockStart);

  //   displayBytes += <div>{bytes.blockStart}</div>;
  // }

  const displayBytes = Array.from(
    { length: 0x0100 / 0x0008 + 0x0001 },
    (_, i) => {
      const bytes = viewMemoryAt(i * 0x0008, memory);
      const byteSpans = bytes.bytes.map(byte => (
        <span className={byte.address} key={byte.address}>
          {byte.value}
        </span>
      ));
      return (
        <div className={bytes.blockStart} key={bytes.blockStart}>
          {bytes.blockStart}: {byteSpans}
        </div>
      );
    }
  );

  return <div className="Memory">{displayBytes}</div>;
}

export default Memory;
