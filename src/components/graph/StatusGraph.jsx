import React from 'react';
// import _includes from 'lodash/collection/includes';
import filters from '../../helpers/filters';
import StatusBar from './StatusBar';
import GraphBack from './GraphBack';
import oldStatus from '../../data/status_old';
const TransitionGroup = React.addons.CSSTransitionGroup;

class StatusGraph extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'StatusGraph';
  }

  render() {
    const condition = this.props.condition;

    const status = this.props.data.map((_item) => {
      let item = _item;

      if (condition.names.length) {
        if (!filters.name(item, condition)) {
          return false;
        }
      } else {
        if (!filters.type(item, condition) || !filters.family(item, condition) || !filters.rare(item, condition)) {
          return false;
        }
      }

      if (condition.isOldStatus) {
        item = oldStatus.filter((old) => {
          return old.id === item.id;
        })[0] || item;
      }

      let total = 0;
      const bars = Object.keys(item[condition.statusType]).map((key) => {
        // filter by status
        if (condition.status.indexOf(key) !== -1) {
        // if (!_includes(condition.status, key)) {
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
        <div className={`${this.name}_item ${this.name}_item-bars${bars.length}`} key={item.id}>
          <div className={`${this.name}_bars`}>
            {bars}
          </div>
          <div className={`${this.name}_info`}>
            <p className={`${this.name}_info_name`}>
              <a href={item.url1} target="_new">{item.name}</a>
            </p>
            <p className={`${this.name}_info_id`}>
              No. {item.id}
            </p>
            <p className={`${this.name}_info_total`}>
              合計：{total}
            </p>
          </div>
        </div>
      );
    });

    return (
      <div className={this.name}>
        <div className={`${this.name}_body`}>
          <TransitionGroup transitionName={this.name} transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {status}
          </TransitionGroup>
        </div>
        <GraphBack />
      </div>
    );
  }
}

export default StatusGraph;
