class GraphBack extends React.Component {
  constructor() {
    super();
  }

  render() {
    // create background lines
    const lines = [];

    for (let i = 100; i > 0; i -= 5) {
      lines.push(<div className="graph-back" key={i} data-line={i} />);
    }

    return (
      <div id="status-graph-back">
        {lines}
      </div>
    );
  }
}

export default GraphBack;
