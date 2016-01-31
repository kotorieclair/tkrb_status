import React from 'react';

class GraphBack extends React.Component {
  constructor() {
    super();

    this.name = 'GraphBack';
  }

  render() {
    // create background lines
    const lines = [];

    for (let i = 100; i > 0; i -= 5) {
      lines.push(<div className={`${this.name}_line`} key={i} data-line={i} />);
    }

    return (
      <div className={this.name}>
        {lines}
      </div>
    );
  }
}

export default GraphBack;
