import React from 'react';
import config from '../../config';
import filters from '../../helpers/filters';
import CheckboxGroup from './CheckboxGroup';
// import FormTab from './FormTab';
// import FormCheckRadio from './FormCheckRadio';

/**
 * ConditionsPane component
 * A form to set the conditionals for the data display
 */
class ConditionsPane extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'ConditionsPane';
  }

  // notifies the status type change to the parent
  setStatusType(e) {
    this.props.onStatusTypeChange(e.currentTarget.value);
  }

  // notifies the status mode change to the parent
  setStatusMode() {
    this.props.onStatusModeChange();
  }

  // notifies the type change to the parent
  setTypeFilter() {
    this.props.onConditionChange({ type: this._checkboxFilter('type') });
  }

  // notifies the family change to the parent
  setFamilyFilter() {
    this.props.onConditionChange({ family: this._checkboxFilter('family') });
  }

  // notifies the rare change to the parent
  setRareFilter() {
    const rare = this._checkboxFilter('rare', (_rare) => {
      return parseInt(_rare, 10);
    });
    this.props.onConditionChange({rare});
  }

  render() {
    const { condition } = this.props;
    const { labels } = config;

    return(
      <div className={this.name}>
        <CheckboxGroup fieldName="テスト" items={labels.type} checkedItems={condition.type} />
        status type

        condition pane
      </div>
    );
  }
}

export default ConditionsPane;
