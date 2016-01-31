import React from 'react';
import ReactDOM from 'react-dom';
// import _includes from 'lodash/collection/includes';
import config from '../../config';
import FormTab from './FormTab';
import FormCheckRadio from './FormCheckRadio';

/**
 * ConditionalForm component
 * A form to set the conditionals for the data display
 */
class ConditionalForm extends React.Component {
  constructor(props) {
    super(props);

    // set state
    this.state = {
      suggestedNames: {
        index: null,
        names: [],
      },
    };

    // bind 'this' to the methods
    this._checkboxFilter = this._checkboxFilter.bind(this);
    this.setStatusType = this.setStatusType.bind(this);
    this.setStatusMode = this.setStatusMode.bind(this);
    this.setTypeFilter = this.setTypeFilter.bind(this);
    this.setFamilyFilter = this.setFamilyFilter.bind(this);
    this.setRareFilter = this.setRareFilter.bind(this);
    this.setNamesFilter = this.setNamesFilter.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.suggestNames = this.suggestNames.bind(this);
    this.addSuggestedName = this.addSuggestedName.bind(this);
  }

  // gathers the checked checkboxes's value
  _checkboxFilter(cond) {
    const chbxs = ReactDOM.findDOMNode(this).querySelectorAll(`[name='${cond}']`);
    const arr = [];

    Array.prototype.forEach.call(chbxs, (chbx) => {
      if (chbx.checked) {
        arr.push(chbx.value);
      }
    });

    return arr;
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
    const type = this._checkboxFilter('type');
    this.props.onConditionChange({type});
  }

  // notifies the family change to the parent
  setFamilyFilter() {
    const family = this._checkboxFilter('family');
    this.props.onConditionChange({family});
  }

  // notifies the rare change to the parent
  setRareFilter() {
    let rare = this._checkboxFilter('rare');
    rare = rare.map((_rare) => {
      return parseInt(_rare, 10);
    });
    this.props.onConditionChange({rare});
  }

  // notifies the names change to the parent
  setNamesFilter() {
    // creates an array of the inputted names
    const input = this._namesInput.value;
    let names = [];
    if (input.length) {
      names = input.split(',');
    }

    this.props.onConditionChange({names});

    // suggests the name completion
    this.suggestNames(names);
  }

  // checks all items in a checkbox group
  selectAll(e) {
    e.preventDefault();
    const tmp = {};
    tmp[e.target.value] = config.labels[e.target.value];
    this.props.onConditionChange(tmp);
  }

  // unchecks all items in a checkbox group
  selectNone(e) {
    e.preventDefault();
    const tmp = {};
    tmp[e.target.value] = [];
    this.props.onConditionChange(tmp);
  }

  // handles the active tab change
  changeActiveTab() {
    this.setState({
      suggestedNames: {
        index: null,
        names: [],
      },
    });
  }

  // suggests the name completion
  suggestNames(inputs) {
    const suggestedNames = {
      index: null,
      names: [],
    };

    // returns the suggestion only for the first incomplete name in the inputs
    inputs.some((input, index) => {
      if (!input) {
        return false;
      }

      const filteredNames = this.props.data.filter((item) => {
        // don't include the name which is already in the inputs
        if (this.props.condition.names.indexOf(item.name) === -1) {
          if (item.name.includes(input)) {
            return true;
          }
        }
      });

      if (filteredNames.length) {
        suggestedNames.index = index;
        suggestedNames.names = filteredNames;
        return true;
      }

      return false;
    });

    this.setState({suggestedNames});
  }

  // adds the suggested name to the names input
  addSuggestedName(e) {
    const name = e.currentTarget.getAttribute('data-name');

    const _names = this.props.condition.names;
    const index = this.state.suggestedNames.index;
    const names = _names.slice(0, index).concat(name, _names.slice(index + 1));

    this.props.onConditionChange({names});

    this.setState({
      suggestedNames: {
        index: null,
        names: [],
      },
    });
  }

  render() {
    const statusType = Object.keys(config.labels.statusType);
    const statusTypeInput = statusType.map((item) => {
      const props = {
        key: item,
        type: 'radio',
        name: 'statusType',
        value: item,
        checked: this.props.condition.statusType === item,
        onChange: this.setStatusType,
      };
      return (
        <FormCheckRadio {...props}>
          {config.labels.statusType[item]}
        </FormCheckRadio>
      );
    });

    const _props = {
      type: 'radio',
      name: 'statusMode',
      checked: this.props.condition.isOldStatus,
      onChange: this.setStatusMode,
    };
    const statusModeInput = (
      <FormCheckRadio {..._props}>
        旧ステータス表示
      </FormCheckRadio>
    );

    const typeInput = config.labels.type.map((item) => {
      const props = {
        key: item,
        type: 'checkbox',
        name: 'type',
        value: item,
        checked: this.props.condition.type.indexOf(item) !== -1 ? true : false,
        onChange: this.setTypeFilter,
      };
      return (
        <FormCheckRadio {...props}>
          {item}
        </FormCheckRadio>
      );
    });

    const familyInput = config.labels.family.map((item) => {
      const props = {
        key: item,
        type: 'checkbox',
        name: 'family',
        value: item,
        checked: this.props.condition.family.indexOf(item) !== -1 ? true : false,
        // checked: _includes(this.props.condition.family, item),
        onChange: this.setFamilyFilter,
      };
      return (
        <FormCheckRadio {...props}>
          {item}
        </FormCheckRadio>
      );
    });

    const rareInput = config.labels.rare.map((item) => {
      const props = {
        key: item,
        type: 'checkbox',
        name: 'rare',
        value: item,
        checked: this.props.condition.rare.indexOf(item) !== -1 ? true : false,
        // checked: _includes(this.props.condition.rare, item),
        onChange: this.setRareFilter,
      };
      return (
        <FormCheckRadio {...props}>
          レア{item}
        </FormCheckRadio>
      );
    });

    let suggestedNames = this.state.suggestedNames.names.map((item) => {
      return (
        <li key={item.name} data-name={item.name} onClick={this.addSuggestedName}>
          {item.name}
        </li>
      );
    });

    if (suggestedNames.length) {
      suggestedNames = React.createElement(
        'ul',
        { className: 'names-suggested' },
        suggestedNames
      );
    }

    return (
      <form className="ConditionalForm">
        <h2>表示条件を変更</h2>
        <FormTab onChangeTab={this.changeActiveTab}>
          <div tabName="status" heading="表示ステータス">
            <div className="input-group cols">
              {statusTypeInput}
            </div>
            <div className="input-group cols">
              {statusModeInput}
            </div>
          </div>

          <div tabName="narrowing" heading="条件で絞り込み">
            <div className="input-group rows">
              <h3>刀種</h3>
              {typeInput}
              <button value="type" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="type" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group rows">
              <h3>刀派</h3>
              {familyInput}
              <button value="family" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="family" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group rows">
              <h3>レアリティ</h3>
              {rareInput}
              <button value="rare" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="rare" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
          </div>

          <div tabName="names" heading="刀剣名指定">
            <input
              type="text"
              ref={(c) => this._namesInput = c}
              value={this.props.condition.names.join(',')}
              placeholder="半角カンマ区切り（空白なし）"
              onChange={this.setNamesFilter} />
            {suggestedNames}
            <button value="names" className="btn-none" onClick={this.selectNone}>
              解除
            </button>
          </div>
        </FormTab>
      </form>
    );
  }
}

export default ConditionalForm;
