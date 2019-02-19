import React from 'react';
import Board from './components/Board';

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COLUMN_ARR = new Array(COLUMNS).fill('')
const GRID = ROW_ARR.map(item => COLUMN_ARR.slice())

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
      <h2> Tic Tac Toe </h2>
      <Board />
      </div>
    )}
}

export default App