import React from 'react';
import config from '../../config';

const name = 'StatusBar';

// create graph bars
const StatusBar = (props) => {
  const val = props.val || props.item.initial[props.name];
  const height = val / config.maxStatus * 100;

  return (
    <div className={`${name} ${name}-${props.name}`} style={{height: `${height}%`}} data-status={props.val && val} />
  );
};

export default StatusBar;
