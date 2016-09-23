import React from 'react';
import config from '../../config';
import ConditionsPane from './ConditionsPane';
import NamesPane from './NamesPane';
// import filters from '../../helpers/filters';
// import FormTab from './FormTab';
// import FormCheckRadio from './FormCheckRadio';

/**
 * ControlPanel component
 * A form to set the conditionals for the data display
 */
class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'ControlPanel';

    this.state = {
      currentPane: null,
    };

    this.setCurrentPane = this.setCurrentPane.bind(this);
  }

  setCurrentPane(e) {
    const paneId = e.target.dataset.targetPane;
    this.setState({
      currentPane: paneId,
    });
  }

  render() {
    return(
      <div className={this.name}>
        <div className={`${this.name}_header`}>
          panel
        </div>
        <div className={`${this.name}_body`}>
          <div className={`${this.name}_bodyLeft`}>
            <ul>
              <li onClick={this.setCurrentPane} data-target-pane="menu1">menu1</li>
              <li onClick={this.setCurrentPane} data-target-pane="menu2">menu2</li>
            </ul>
          </div>
          <div className={`${this.name}_bodyRight`}>
            <div className={`${this.name}_pane${this.state.currentPane === 'menu1' ? `${this.name}_pane-open` : ''}`}>
              <ConditionsPane condition={this.props.condition} />
            </div>
            <div className={`${this.name}_pane${this.state.currentPane === 'menu2' ? `${this.name}_pane-open` : ''}`}>
              <NamesPane />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
