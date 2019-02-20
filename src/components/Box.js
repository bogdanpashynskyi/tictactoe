import React from 'react'

const Box = ({
    onClick,
    columnIndex,
    rowIndex,
    value
}) => {
  const indexes = { rowIndex, columnIndex }
    return (
        <div 
        className="app__boxes rounded "
        onClick={() => onClick(indexes)}>
        <div className="app__value"> {value}</div>
        </div>
    )
}

export default Box