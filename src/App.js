import React from 'react';
import Board from './components/Board';

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COLUMN_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(item => COLUMN_ARR.slice());
const winCombos = [
	'012',
	'036',
	'048',
	'147',
	'258',
	'345',
	'678',
	'246',
]

class App extends React.Component {
  constructor() {
		super();
		
		this.state = {
			currentValue: "X",
			grid: GRID,
			winner: ''
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick({ rowIndex, columnIndex }) {
		const {
			currentValue, 
			grid
		} = this.state;

		// check if already clicked
		if (grid[rowIndex][columnIndex]) {
			return 
		}

		grid[rowIndex][columnIndex] = currentValue;

		//flip value
		const nextValue = currentValue === 'X' ? 'O' : 'X';
		this.setState({ 
			grid,
			currentValue: nextValue, 
		})
		
		const gridItems = this.getIndexes({grid: this.state.grid, value: currentValue});

		const winner = this.checkWinner(gridItems);
		this.setState({winner: winner }); 
		
	}

	checkWinner(grid) {
		const found = winCombos.find(indexes => {
			const [a, b, c] = [...indexes];

			return grid[a] !== false
				&& grid[a].col === grid[b].col 
				&& grid[b].col === grid[c].col
		});

		return found ? grid[found[0]].col : null;
	}

	getIndexes({grid, value}) {
		const mappedItems = grid.map((row) => {
			return row.map((col) => {
				return col === value && {
					col
				}
			})
		})
		return this.flattenAndFilter(mappedItems)
	}

	flattenAndFilter(grid) {
		const arr = [];
	
		grid.forEach(item => {
			arr.push(...item)
		})
	
		return arr;
	}
	
  render() {
		const { grid } = this.state;
    return (
      <div>
				<Board 
					rows={grid}
					onClick={this.handleClick}
				/>
				{ this.state.winner ? <div> Player {this.state.winner} won! </div> : ''}
      </div>
    )}
}

export default App