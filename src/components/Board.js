import React from 'react'
import Row from './Row'

const Board = ({
	rows,
	onClick
}) =>	(
	<div> 
		{rows.map((row, index) =>
			<Row 
				key={index}
				boxes={row}
				onClick={onClick}
				rowIndex={index}
			/>)} 
	</div>
)

export default Board