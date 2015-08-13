class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // create graph bars
    const val = this.props.item[this.props.statusType][this.props.name];
    let _height = "";

    if (val) {
      _height = val / this.props.maxStatus * 100 + '%';
    } else {
      _height = this.props.item.initial[this.props.name] / this.props.maxStatus * 100 + '%';
    }

    return (
      <div className={`status-bar ${this.props.name}`} style={{height: _height}} data-status={val}></div>
    );
  }
}

export default StatusBar;
