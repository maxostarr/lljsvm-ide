const createMemory = (sizeInBytes) => {
  const ab = new ArrayBuffer(sizeInBytes);
  const dv = new DataView(ab);
  return dv;
};

export default createMemory;
