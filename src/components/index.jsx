var data = require('../data/status');
var config = require('../config');
var TkrbStatus = require('./tkrbStatus');

React.render(
  <TkrbStatus data={data} config={config} />,
  document.getElementById('tkrb-status')
);
