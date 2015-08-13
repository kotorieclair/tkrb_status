import config from '../config';
import _includes from 'lodash/collection/includes';
import _filter from 'lodash/collection/filter';
import BaseComponent from './baseComponent';
import FormCheckRadio from './formCheckRadio';

// form: setting conditions
class ConditionalForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeField: 'status',
      suggests: [],
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
    this.changeField = this.changeField.bind(this);
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
    const _type = this._checkboxFilter('type');
    this.props.onConditionChange({
      type: _type,
    });
  }

  setFamilyFilter() {
    const _family = this._checkboxFilter('family');
    this.props.onConditionChange({
      family: _family,
    });
  }

  setRareFilter() {
    let _rare = this._checkboxFilter('rare');
    _rare = _rare.map((rare) => {
      return parseInt(rare, 10);
    });
    this.props.onConditionChange({
      rare: _rare,
    });
  }

  setNamesFilter() {
    const _input = React.findDOMNode(this.refs.names).value;
    let _names = [];
    if (_input.length) {
      _names = _input.split(',');
    }

    const _last = _names[_names.length - 1];
    let _suggests = [];
    if (_last) {
      _suggests = _filter(this.props.data, (item) => {
        if (!_includes(this.props.condition.names, item.name)) {
          if (item.name.includes(_last)) {
            if (item.name !== _last) {
              return true;
            }
          }
        }
      });
    }

    this.setState({
      suggests: _suggests,
    });

    this.props.onConditionChange({
      names: _names,
    });
  }

  selectAll(e) {
    e.preventDefault();
    const _tmp = {};
    _tmp[e.target.value] = config.labels[e.target.value];
    this.props.onConditionChange(_tmp);
  }

  selectNone(e) {
    e.preventDefault();
    const _tmp = {};
    _tmp[e.target.value] = [];
    this.props.onConditionChange(_tmp);
  }

  changeField(e) {
    const _field = e.currentTarget.getAttribute('data-field');
    if (_field === this.state.activeField) {
      this.setState({
        activeField: null,
      });
    } else {
      this.setState({
        activeField: _field,
        suggests: [],
      });
    }
  }

  addSuggestedName(e) {
    const _name = e.currentTarget.getAttribute('data-name');

    const _names = this.props.condition.names;
    _names[_names.length - 1] = _name;

    this.props.onConditionChange({
      names: _names,
    });

    this.setState({
      suggests: [],
    });
  }

  render() {
    const _st = Object.keys(config.labels.statusType);
    const statusTypeInput = _st.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="radio"
          name="statusType"
          value={item}
          checked={this.props.condition.statusType === item}
          onChange={this.setStatusType}
        >
          {config.labels.statusType[item]}
        </FormCheckRadio>
      );
    });

    const statusModeInput = (
      <FormCheckRadio
        type="radio"
        name="statusMode"
        checked={this.props.condition.isOldStatus}
        onChange={this.setStatusMode}
      >
        旧ステータス表示
      </FormCheckRadio>
    );

    const typeInput = config.labels.type.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="type"
          value={item}
          checked={_includes(this.props.condition.type, item)}
          onChange={this.setTypeFilter}
        >
          {item}
        </FormCheckRadio>
      );
    });

    const familyInput = config.labels.family.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="family"
          value={item}
          checked={_includes(this.props.condition.family, item)}
          onChange={this.setFamilyFilter}
        >
          {item}
        </FormCheckRadio>
      );
    });

    const rareInput = config.labels.rare.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="rare"
          value={item}
          checked={_includes(this.props.condition.rare, item)}
          onChange={this.setRareFilter}
        >
          レア{item}
        </FormCheckRadio>
      );
    });

    const suggestedNames = this.state.suggests.map((item) => {
      return (
        <li key={item.name} data-name={item.name} onClick={this.addSuggestedName}>
          {item.name}
        </li>
      );
    });

    return (
      <form id="status-form" className={`active-${this.state.activeField}`}>
        <h2>表示条件を変更</h2>
        <fieldset>
          <legend onClick={this.changeField} data-field="status">
            表示ステータス<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            <div className="input-group cols">
              {statusTypeInput}
            </div>
            <div className="input-group cols">
              {statusModeInput}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="narrowing">
            条件で絞り込み<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
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
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="names">
            刀剣名指定<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            <input
              type="text"
              ref="names"
              value={this.props.condition.names.join(',')}
              placeholder="半角カンマ区切り（空白なし）"
              onChange={this.setNamesFilter}/>
            <ul className="names-suggested">
              {suggestedNames}
            </ul>
            <button value="names" className="btn-none" onClick={this.selectNone}>
              解除
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default ConditionalForm;
