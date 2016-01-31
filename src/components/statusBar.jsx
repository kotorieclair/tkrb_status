import config from '../config';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'StatusBar';
  }

  render() {
    // create graph bars
    const item = this.props.item;
    const name = this.props.name;
    const val = item[this.props.statusType][name];
    let height = '';

    if (val) {
      height = val / config.maxStatus * 100;
    } else {
      height = item.initial[name] / config.maxStatus * 100;
    }

    const props = {
      className: `${this.name} ${this.name}-${this.props.name}`,
      style: {
        height: `${height}%`,
      },
      'data-status': val,
    };

    return (
      <div {...props} />
    );
  }
}

export default StatusBar;
