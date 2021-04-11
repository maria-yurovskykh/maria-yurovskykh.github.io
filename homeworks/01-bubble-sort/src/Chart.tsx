import React from 'react';

type Props = {
  array: number[];
};

export default class Chart extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <div className='chart'>
        {
          this.props.array.map((n, index) => {
            return <span className='column' key={index} style={{height: `${n}px`}}></span>;
          })
        }
      </div>
    );
  }
}
