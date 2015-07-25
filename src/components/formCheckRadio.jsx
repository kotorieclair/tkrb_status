module.exports = React.createClass({
  handleChange: function(e) {
    this.props.change(e);
  },
  render: function() {
    var {change, children, ...others} = this.props;
    return (
      <label>
        <input {...others} onChange={this.handleChange} />
        <span>
          <i className="fa fa-check"></i>
          {this.props.children}
        </span>
      </label>
    )
  }
});
