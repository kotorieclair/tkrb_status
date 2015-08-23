class GraphBack extends React.Component {
  constructor() {
    super();
  }

  render() {
    // create background lines
    const lines = [];

    for (let i = 100; i > 0; i -= 5) {
      lines.push(<div className="GraphBack-line" key={i} data-line={i} />);
    }

    return (
      <div id="GraphBack">
        {lines}
      </div>
    );
  }
}

export default GraphBack;
