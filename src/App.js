import React from 'react';
import Board from './components/Board';

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COLUMN_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(item => COLUMN_ARR.slice());

class App extends React.Component {
  constructor() {
		super();
		
		this.state = {
			currentValue: "X",
			grid: GRID
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
			currentValue: nextValue 
		})
	}

  render() {
		const { grid } = this.state;

    return (
      <div>
				<Board 
					rows={grid}
					onClick={this.handleClick}
				/>
      </div>
    )}
}

export default App