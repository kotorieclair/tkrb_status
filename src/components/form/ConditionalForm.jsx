import React from 'react';
import config from '../../config';
import filters from '../../helpers/filters';
import FormTab from './FormTab';
import FormCheckRadio from './FormCheckRadio';

/**
 * ConditionalForm component
 * A form to set the conditionals for the data display
 */
class ConditionalForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialSuggestedNames = {
      index: null,
      names: [],
    };

    // set state
    this.state = {
      suggestedNames: this.initialSuggestedNames,
    };

    // bind 'this' to the methods
    this.setStatusType = this.setStatusType.bind(this);
    this.setStatusMode = this.setStatusMode.bind(this);
    this.setTypeFilter = this.setTypeFilter.bind(this);
    this.setFamilyFilter = this.setFamilyFilter.bind(this);
    this.setRareFilter = this.setRareFilter.bind(this);
    this.setNameFilter = this.setNameFilter.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.addSuggestedName = this.addSuggestedName.bind(this);
  }

  // gathers the checked checkboxes's value
  _checkboxFilter(cond, fn = (item) => item) {
    const chbxs = this._form.querySelectorAll(`[name='${cond}']`);
    const arr = [];

    Array.prototype.forEach.call(chbxs, (chbx) => {
      if (chbx.checked) {
        arr.push(fn(chbx.value));
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

  // notifies the names change to the parent
  setNameFilter() {
    // creates an array of the inputted names
    const input = this._nameInput.value;
    const names = input.length ? input.split(',') : [];

    this.props.onConditionChange({ name: names });

    // suggests the name completion
    this.suggestNames(names);
  }

  // checks all items in a checkbox group
  selectAll(e) {
    e.preventDefault();
    this.props.onConditionChange({ [e.target.value]: config.labels[e.target.value] });
  }

  // unchecks all items in a checkbox group
  selectNone(e) {
    e.preventDefault();
    this.props.onConditionChange({ [e.target.value]: [] });
  }

  // handles the active tab change
  changeActiveTab() {
    this.setState({ suggestedNames: this.initialSuggestedNames });
  }

  // suggests the name completion
  suggestNames(inputs) {
    const suggestedNames = {...this.initialSuggestedNames};

    // returns the suggestion only for the first incomplete name in the inputs
    inputs.some((input, index) => {
      if (!input) {
        return false;
      }

      const filteredNames = this.props.data.filter((item) => {
        // don't include the name which is already in the inputs
        if (!filters.name(item.name, this.props.condition)) {
          if (item.name.match(input)) {
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

    const _names = this.props.condition.name;
    const index = this.state.suggestedNames.index;
    const names = _names.slice(0, index).concat(name, _names.slice(index + 1));

    this.props.onConditionChange({ name: names });

    this.setState({ suggestedNames: this.initialSuggestedNames });
  }

  render() {
    const { condition } = this.props;
    const { labels } = config;
    const { names: suggestedNames } = this.state.suggestedNames;

    return (
      <form className="ConditionalForm" ref={(c) => this._form = c}>
        <h2>表示条件を変更</h2>
        <FormTab onChangeTab={this.changeActiveTab}>
          <div tabName="status" heading="表示ステータス">
            <div className="input-group cols">
              {Object.keys(labels.statusType).map((statusType) => {
                return (
                  <FormCheckRadio key={statusType} type="radio" name="statusType" value={statusType} checked={condition.statusType === statusType} onChange={this.setStatusType}>
                    {labels.statusType[statusType]}
                  </FormCheckRadio>
                );
              })}
            </div>
            <div className="input-group cols">
              <FormCheckRadio type="radio" name="statusMode" checked={condition.isOldStatus} onChange={this.setStatusMode}>
                旧ステータス表示
              </FormCheckRadio>
            </div>
          </div>

          <div tabName="narrowing" heading="条件で絞り込み">
            <div className="input-group rows">
              <h3>刀種</h3>
              {labels.type.map((type) => {
                return (
                  <FormCheckRadio key={type} type="checkbox" name="type" value={type} checked={filters.type(type, condition)} onChange={this.setTypeFilter}>
                    {type}
                  </FormCheckRadio>
                );
              })}
              <button value="type" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="type" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group rows">
              <h3>刀派</h3>
              {labels.family.map((family) => {
                return (
                  <FormCheckRadio key={family} type="checkbox" name="family" value={family} checked={filters.family(family, condition)} onChange={this.setFamilyFilter}>
                    {family}
                  </FormCheckRadio>
                );
              })}
              <button value="family" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="family" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group rows">
              <h3>レアリティ</h3>
              {labels.rare.map((rare) => {
                return (
                  <FormCheckRadio key={rare} type="checkbox" name="rare" value={rare} checked={filters.rare(rare, condition)} onChange={this.setRareFilter}>
                    レア{rare}
                  </FormCheckRadio>
                );
              })}
              <button value="rare" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="rare" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
          </div>

          <div tabName="name" heading="刀剣名指定">
            <input
              type="text"
              ref={(c) => this._nameInput = c}
              value={condition.name.join(',')}
              placeholder="半角カンマ区切り（空白なし）"
              onChange={this.setNameFilter} />
            {suggestedNames.length ? (
              <ul className="names-suggested">
                {suggestedNames.map((item) => {
                  const name = item.name;
                  return (
                    <li key={name} data-name={name} onClick={this.addSuggestedName}>
                      {name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <button value="name" className="btn-none" onClick={this.selectNone}>
              解除
            </button>
          </div>
        </FormTab>
      </form>
    );
  }
}

export default ConditionalForm;
