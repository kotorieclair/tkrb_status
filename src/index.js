import data from './data/status';
import TkrbStatus from './components/tkrbStatus';

React.render(
  <TkrbStatus data={data} />,
  document.getElementById('tkrb-status')
);
