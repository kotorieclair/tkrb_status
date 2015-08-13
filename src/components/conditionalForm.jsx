import config from '../config';
import _includes from 'lodash/collection/includes';
import FormCheckRadio from './formCheckRadio';

// form: setting conditions
class ConditionalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeField: 'status',
    };

    this._checkboxFilter = this._checkboxFilter.bind(this);
    this.setStatusType = this.setStatusType.bind(this);
    this.setTypeFilter = this.setTypeFilter.bind(this);
    this.setFamilyFilter = this.setFamilyFilter.bind(this);
    this.setRareFilter = this.setRareFilter.bind(this);
    this.setNamesFilter = this.setNamesFilter.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
    this.changeField = this.changeField.bind(this);
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
      });
    }
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

    return (
      <form id="status-form" className={`active-${this.state.activeField}`}>
        <h2>表示条件を変更</h2>
        <fieldset>
          <legend onClick={this.changeField} data-field="status">
            表示ステータス<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            {statusTypeInput}
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="narrowing">
            絞り込み<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            <div className="input-group">
              <h3>刀種</h3>
              {typeInput}
              <button value="type" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="type" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group">
              <h3>刀派</h3>
              {familyInput}
              <button value="family" className="btn-all" onClick={this.selectAll}>
                全選択
              </button>
              <button value="family" className="btn-none" onClick={this.selectNone}>
                全解除
              </button>
            </div>
            <div className="input-group">
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
              onChange={this.setNamesFilter}
            />
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
