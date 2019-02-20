import React from 'react';
import Board from './components/Board';
import cloneDeep from 'lodash.clonedeep'

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COLUMN_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(item => COLUMN_ARR.slice());
const cloneGrid = cloneDeep(GRID);

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

const flex = {
	"display": "flex",

}

const margin = {
	"margin": "10px",
}

const ghost = {
	"opacity": "0",
}

class App extends React.Component {
  constructor() {
		super();
		
		this.state = {
			currentValue: "X",
			grid: GRID,
			winner: null,
			draw: false,
			hasStarted: false,
		}

		this.handleClick = this.handleClick.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}

	handleClick({ rowIndex, columnIndex }) {
		
		// disable clicks if there is a winner
		if (this.state.winner || this.state.hasStarted === false) {
			return
		}
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
		this.setState({ winner: winner });
		this.checkForDraw(gridItems)
	}

	checkForDraw(grid) {
		let count = 0;
		for (let i = 0; grid.length > i; i++) {
			if (grid[i]) {
				count = count + 1;
			}
		}
		console.log(count)
		if (count === 5) {
			this.setState({ draw: true })
		}
	}

	checkWinner(grid) {
		if (this.state.winner !== null) {
			return
		}

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

	restartGame() {
		const newGrid = cloneDeep(cloneGrid);
		this.setState({ 
			grid: newGrid,
			hasStarted: true, 
			winner: null, 
			currentValue: 'X',
			draw: false })
	}
	
  render() {
		const { grid } = this.state;
    return (
      <div>
				<h2>Tic Tac Toe</h2>
				{ this.state.winner 
					? <div>	<div className={flex}> Player {this.state.winner} won! </div> </div> 
					: <div style={ghost}>0</div>}
				{ this.state.draw && !this.state.winner
					 ? <div> It's a draw </div> : <div style={ghost}>0</div>}
				<Board 
					rows={grid}
					onClick={this.handleClick}
				/>
				<button 
					className="btn btn-primary"
					style={margin}
					onClick={this.restartGame}> 
					{!this.state.hasStarted ? 'Start': 'Restart'} 
				</button>
				<div>
					Player { this.state.currentValue } next
				</div>
      </div>
    )}
}

export default App