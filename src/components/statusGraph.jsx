import _includes from 'lodash/collection/includes';
import _filter from 'lodash/collection/filter';
import BaseComponent from './baseComponent';
import StatusBar from './statusBar';
import GraphBack from './graphBack';
import oldStatus from '../data/status_old';
const TransitionGroup = React.addons.CSSTransitionGroup;

class StatusGraph extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const condition = this.props.condition;
    const status = this.props.data.map((_item) => {
      let item = _item;

      if (condition.names.length) {
        if (!this._namesFilter(item)) {
          return false;
        }
      } else {
        if (!this._typeFilter(item) || !this._familyFilter(item) || !this._rareFilter(item)) {
          return false;
        }
      }

      if (this.props.condition.isOldStatus) {
        item = _filter(oldStatus, (old) => {
          return old.id === item.id;
        })[0] || item;
      }

      let total = 0;
      const bars = Object.keys(item[condition.statusType]).map((key) => {
        // filter by status
        if (!_includes(condition.status, key)) {
          return false;
        }

        total += item[condition.statusType][key];

        const props = {
          statusType: condition.statusType,
          item: item,
          name: key,
          key: key,
        };

        return (
          <StatusBar {...props} />
        );
      });

      // create graphs for each character
      return (
        <div className={`status-graph-item bars-${bars.length}`} key={item.id}>
          <div className="status-bar-box">
            <TransitionGroup transitionName="status-bar" transitionAppear={true}>
              {bars}
            </TransitionGroup>
          </div>
          <div className="status-info-box">
            <p className="info-name">
              <a href={item.url1} target="_new">{item.name}</a>
            </p>
            <p className="info-id">
              No. {item.id}
            </p>
            <p className="info-total">
              合計：{total}
            </p>
          </div>
        </div>
      );
    });

    return (
      <div id="status-graph">
        <div id="status-graph-box">
          <TransitionGroup transitionName="status-graph" transitionAppear={true}>
            {status}
          </TransitionGroup>
        </div>
        <GraphBack />
      </div>
    );
  }
}

export default StatusGraph;
