import React from "react";
import "./memory.css";
const viewMemoryAt = (address, memory) => {
  const bytes = Array.from({ length: 8 }, (_, i) => {
    const v = memory.getUint8(address + i);
    return {
      address: address + i,
      value: `0x${v.toString(16).padStart(2, "0")}`
    };
  });
  return { blockStart: address.toString(16).padStart(4, "0"), bytes: bytes };
};

function Memory({ memory, ip }) {
  const displayBytes = Array.from(
    { length: 0x0100 / 0x0008 + 0x0001 },
    (_, i) => {
      const bytes = viewMemoryAt(i * 0x0008, memory);
      const byteSpans = bytes.bytes.map(byte => (
        <span
          className={byte.address + (ip === byte.address ? " highlighted" : "")}
          key={byte.address}
        >
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
