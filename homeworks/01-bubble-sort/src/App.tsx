import React, {ReactNode} from 'react';
import {generateRandomArray, sortIteration} from './utils';
import Chart from './Chart';
import './index.css';

const STEP_TIME: number = 200;
const COLUMNS_AMOUNT: number = 20;
const COLUMNS_MAX_HEIGHT: number = 200;

type Props = {};
type State = {
  isExecuting: boolean,
  isSorted: boolean,
  array: number[]
}

export default class App extends React.Component<Props, State> {

  private timer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      isExecuting: false,
      isSorted: false,
      array: generateRandomArray(COLUMNS_AMOUNT, COLUMNS_MAX_HEIGHT)
    }
  }

  private startSorting(): void {
    if (!this.state.isSorted) {
      this.timer = setInterval(() => {
        const [sortedArray, isSorted]: [number[], boolean] = sortIteration(this.state.array);
        if (isSorted) {
          this.clearInterval();
          this.setState({isExecuting: false, isSorted: true});
        }
        this.setState({array: sortedArray, isExecuting: true});
      }, STEP_TIME);
    }
  }

  private stopSorting(): void {
    this.clearInterval();
    this.setState({isExecuting: false});
  }

  private updateSet(): void {
    this.clearInterval();
    this.setState({
      isExecuting: false,
      isSorted: false,
      array: generateRandomArray(COLUMNS_AMOUNT, COLUMNS_MAX_HEIGHT)
    });
  }

  private clearInterval(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render(): ReactNode {
    return (
      <div className='app'>
        <h1>Bubble Sorting &#128705;</h1>
        <Chart array={this.state.array}/>
        {
          this.state.isExecuting && !this.state.isSorted ?
            <button onClick={() => this.stopSorting()}>Pause</button> :
            <button onClick={() => this.startSorting()} disabled={this.state.isSorted}>Start</button>
        }
        <button onClick={() => this.updateSet()}>New Set</button>
        <p>{this.state.isSorted ? 'Sorted :)' : 'Not sorted :('}</p>
      </div>
    );
  }
}
