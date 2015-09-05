import config from '../config';
import _includes from 'lodash/collection/includes';
import _filter from 'lodash/collection/filter';
import BaseComponent from './baseComponent';
import FormTab from './formTab';
import FormCheckRadio from './formCheckRadio';

// form: setting conditions
class ConditionalForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      suggestedNames: {
        index: null,
        names: [],
      },
    };

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

  _checkboxFilter(cond) {
    const _chbxs = React.findDOMNode(this).querySelectorAll(`[name='${cond}']`);
    const _arr = [];

    Array.prototype.forEach.call(_chbxs, (_chbx) => {
      if (_chbx.checked) {
        _arr.push(_chbx.value);
      }
    });

    return _arr;
  }

  setStatusType(e) {
    this.props.onStatusTypeChange(e.currentTarget.value);
  }

  setStatusMode() {
    this.props.onStatusModeChange();
  }

  setTypeFilter() {
    const type = this._checkboxFilter('type');
    this.props.onConditionChange({type});
  }

  setFamilyFilter() {
    const family = this._checkboxFilter('family');
    this.props.onConditionChange({family});
  }

  setRareFilter() {
    let rare = this._checkboxFilter('rare');
    rare = rare.map((_rare) => {
      return parseInt(_rare, 10);
    });
    this.props.onConditionChange({rare});
  }

  setNamesFilter() {
    const input = React.findDOMNode(this.refs.names).value;
    let names = [];
    if (input.length) {
      names = input.split(',');
    }

    this.props.onConditionChange({names});

    this.suggestNames(names);
  }

  selectAll(e) {
    e.preventDefault();
    const tmp = {};
    tmp[e.target.value] = config.labels[e.target.value];
    this.props.onConditionChange(tmp);
  }

  selectNone(e) {
    e.preventDefault();
    const tmp = {};
    tmp[e.target.value] = [];
    this.props.onConditionChange(tmp);
  }

  changeActiveTab() {
    this.setState({
      suggestedNames: {
        index: null,
        names: [],
      },
    });
  }

  suggestNames(inputs) {
    const suggestedNames = {
      index: null,
      names: [],
    };

    inputs.some((input, index) => {
      if (!input) {
        return false;
      }

      const filteredNames = _filter(this.props.data, (item) => {
        if (!_includes(this.props.condition.names, item.name)) {
          if (item.name !== input) {
            if (item.name.includes(input)) {
              return true;
            }
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

  addSuggestedName(e) {
    const targetName = e.currentTarget.getAttribute('data-name');

    const names = this.props.condition.names;
    names[this.state.suggestedNames.index] = targetName;

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
        checked: _includes(this.props.condition.type, item),
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
        checked: _includes(this.props.condition.family, item),
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
        checked: _includes(this.props.condition.rare, item),
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
      <form id="ConditionalForm">
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
              ref="names"
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
