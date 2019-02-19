import React from 'react'
import Box from './Box'
const Row = ({
	boxes,
	onClick,
	rowIndex
}) => (
  <div className="rows">
		{boxes.map((box, index) =>
			<Box
				columnIndex={index}
				key={index} 
				onClick={onClick}
				rowIndex={rowIndex}
				value={box}
			/> )}
  </div>
)

export default Row