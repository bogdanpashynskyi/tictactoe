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
        className="boxes"
        onClick={() => onClick(indexes)}>
            <h3> {value} </h3>
        </div>
    )
}

export default Box