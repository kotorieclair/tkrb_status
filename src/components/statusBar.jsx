import config from '../config';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // create graph bars
    const _item = this.props.item;
    const _name = this.props.name;
    const val = _item[this.props.statusType][_name];
    let _height = '';

    if (val) {
      _height = val / config.maxStatus * 100;
    } else {
      _height = _item.initial[_name] / config.maxStatus * 100;
    }

    return (
      <div
        className={`status-bar ${this.props.name}`}
        style={{height: `${_height}%`}}
        data-status={val}
      />
    );
  }
}

export default StatusBar;
