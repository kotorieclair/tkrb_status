import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/status';
import TkrbStatus from './components/tkrbStatus';

ReactDOM.render(
  <TkrbStatus data={data} />,
  document.getElementById('tkrb-status')
);
