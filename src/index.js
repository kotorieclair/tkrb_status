import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/status';
import TkrbStatus from './components/_TkrbStatus';

ReactDOM.render(
  <TkrbStatus data={data} />,
  document.getElementById('tkrb-status')
);
