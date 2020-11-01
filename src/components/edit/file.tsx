import React from 'react'

interface PropTypes {
  name: string
}

const File = ({name}: PropTypes) => {
  return (
    <div>
      {name}      
    </div>
  )
}

export default File
