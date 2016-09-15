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

  render() {
    return(
      <div className={this.name}>
        <div className={`${this.name}_header`}>
          panel
        </div>
        <div className={`${this.name}_body`}>
          <div className={`${this.name}_bodyLeft`}>
            left
          </div>
          <div className={`${this.name}_bodyRight`}>
            right
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
