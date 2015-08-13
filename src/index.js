import data from './data/status';
import config from './config';
import TkrbStatus from './components/tkrbStatus';

React.render(
  <TkrbStatus data={data} config={config} />,
  document.getElementById('tkrb-status')
);
