import React from 'react';
import config from '../../config';
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
      isOpen: false,
      currentPane: null,
    };
  }

  setCurrentPane(paneId) {
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
              <li onclick={this.setCurrentPane} data-target-pane="menu1">menu1</li>
              <li onclick={this.setCurrentPane} data-target-pane="menu2">menu2</li>
            </ul>
          </div>
          <div className={`${this.name}_bodyRight`}>
            <div className={`${this.name}_pane${currentPane === 'menu1' ? `${this.name}_pane-open` : ''}`}>menu1 pane</div>
            <div className={`${this.name}_pane${currentPane === 'menu2' ? `${this.name}_pane-open` : ''}`}>menu2 pane</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;