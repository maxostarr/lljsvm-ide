import React from "react";

interface PropTypes {
  name: string;
  className: string;
}

const File = ({ name, className }: PropTypes) => {
  return <div className={className}>{name}</div>;
};

export default File;
