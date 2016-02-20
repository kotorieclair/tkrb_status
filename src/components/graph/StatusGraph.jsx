import React from 'react';
// import _includes from 'lodash/collection/includes';
import filters from '../../helpers/filters';
import StatusBar from './StatusBar';
import GraphBack from './GraphBack';
import oldStatus from '../../data/status_old';
const TransitionGroup = React.addons.CSSTransitionGroup;

const cName = 'StatusGraph';

const StatusGraph = (props) => {
  const { condition, data } = props;
  const { isOldStatus, name, statusType, status } = condition;

  // create a graph for each character
  const graphs = data.map((_item) => {
    // replace current status with old status
    const item = isOldStatus && oldStatus.filter((old) => old.id === _item.id)[0] || _item;

    // filter
    if (name.length) {
      if (!filters.name(item, condition)) {
        return false;
      }
    } else {
      if (!filters.type(item, condition) || !filters.family(item, condition) || !filters.rare(item, condition)) {
        return false;
      }
    }

    // sum of the status values
    const total = status.reduce((previous, current) => {
      return previous + item[statusType][current];
    }, 0);

    return (
      <div className={`${cName}_item ${cName}_item-bars${status.length}`} key={item.id}>
        <div className={`${cName}_bars`}>
          {status.map((key) => {
            return <StatusBar key={key} val={item[statusType][key]} name={key} item={item} />;
          })}
        </div>
        <div className={`${cName}_info`}>
          <p className={`${cName}_info_name`}>
            <a href={item.url1} target="_new">{item.name}</a>
          </p>
          <p className={`${cName}_info_id`}>
            No. {item.id}
          </p>
          <p className={`${cName}_info_total`}>
            合計：{total}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className={cName}>
      <div className={`${cName}_body`}>
        <TransitionGroup transitionName={cName} transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {graphs}
        </TransitionGroup>
      </div>
      <GraphBack />
    </div>
  );
};

export default StatusGraph;
