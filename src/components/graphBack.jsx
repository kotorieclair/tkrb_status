module.exports = React.createClass({
  render: function() {
    // create background lines
    var lines = [];

    for (var i = 100 ; i > 0 ; i -= 5) {
      lines.push(<div className="graph-back" key={i} data-line={i}></div>);
    }

    return (
      <div id="status-graph-back">
        {lines}
      </div>
    );
  }
});
