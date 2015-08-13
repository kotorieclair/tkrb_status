import config from '../config';
import _includes from 'lodash/collection/includes';
import BaseComponent from './baseComponent';
import StatusBar from './statusBar';
import GraphBack from './graphBack';
const TransitionGroup = React.addons.CSSTransitionGroup;

class StatusGraph extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const status = this.props.data.map((item) => {
      if (this.props.condition.names.length) {
        if (!this._namesFilter(item)) {
          return false;
        }
      } else {
        if(!this._typeFilter(item) || !this._familyFilter(item) || !this._rareFilter(item)) {
          return false;
        }
      }

      let total = 0;
      var bars = Object.keys(item[this.props.condition.statusType]).map((key) => {
        // filter by status
        if (!_includes(this.props.condition.status, key)) {
          return false;
        }

        total += item[this.props.condition.statusType][key];

        return (
          <StatusBar
            maxStatus={config.maxStatus}
            statusType={this.props.condition.statusType}
            item={item}
            name={key}
            key={key}
           />
        );
      });

      // create graphs for each character
      return (
        <div className={`status-graph-item bars-${bars.length}`} key={item.id}>
          <div className="status-bar-box">
            <TransitionGroup
              transitionName="status-bar"
              transitionAppear={true}
            >
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
          <TransitionGroup
            transitionName="status-graph"
            transitionAppear={true}
          >
            {status}
          </TransitionGroup>
        </div>
        <GraphBack />
      </div>
    );
  }
}

export default StatusGraph;
