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
    this.setTypeFilter = this.setTypeFilter.bind(this);
    this.setFamilyFilter = this.setFamilyFilter.bind(this);
    this.setRareFilter = this.setRareFilter.bind(this);
    this.setNamesFilter = this.setNamesFilter.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
    this.changeField = this.changeField.bind(this);
  }

  _checkboxFilter(cond) {
    const _chbx = React.findDOMNode(this).querySelectorAll(`[name='${cond}']`);
    // const _arr = [];

    const _arr = Array.prototype.map.call(_chbx, (item) => {
      if (item.checked) {
        return item;
      }
    });
    // for (let i = 0; i < _chbx.length; i++) {
    //   if (_chbx[i].checked) {
    //     _arr.push(_chbx[i].value);
    //   }
    // }

    return _arr;
  }

  setStatusType(e) {
    this.props.onStatusTypeChange(e.target.value);
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
      return paseInt(rare, 10);
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
    const _statusTypeInput = Object.keys(config.labels.statusType).map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="radio"
          name="statusType"
          value={item}
          checked={this.props.condition.statusType === item}
          change={this.setStatusType}
        >
          {config.labels.statusType[item]}
        </FormCheckRadio>
      );
    });

    const _typeInput = config.labels.type.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="type"
          value={item}
          checked={_includes(this.props.condition.type, item)}
          change={this.setTypeFilter}
        >
          {item}
        </FormCheckRadio>
      );
    });

    const _familyInput = config.labels.family.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="family"
          value={item}
          checked={_includes(this.props.condition.family, item)}
          change={this.setFamilyFilter}
        >
          {item}
        </FormCheckRadio>
      );
    });

    const _rareInput = config.labels.rare.map((item) => {
      return (
        <FormCheckRadio
          key={item}
          type="checkbox"
          name="rare"
          value={item}
          checked={_includes(this.props.condition.rare, item)}
          change={this.setRareFilter}
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
            {_statusTypeInput}
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="narrowing">
            絞り込み<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            <div className="input-group">
              <h3>刀種</h3>
              {_typeInput}
              <button value="type" className="btn-all" onClick={this.selectAll}>全選択</button>
              <button value="type" className="btn-none" onClick={this.selectNone}>全解除</button>
            </div>
            <div className="input-group">
              <h3>刀派</h3>
              {_familyInput}
              <button value="family" className="btn-all" onClick={this.selectAll}>全選択</button>
              <button value="family" className="btn-none" onClick={this.selectNone}>全解除</button>
            </div>
            <div className="input-group">
              <h3>レアリティ</h3>
              {_rareInput}
              <button value="rare" className="btn-all" onClick={this.selectAll}>全選択</button>
              <button value="rare" className="btn-none" onClick={this.selectNone}>全解除</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="names">
            刀剣名指定<i className="fa fa-caret-down"></i>
          </legend>
          <div className="fieldset-item">
            <input type="text" ref="names" value={this.props.condition.names.join(',')} placeholder="半角カンマ区切り（空白なし）" onChange={this.setNamesFilter} />
            <button value="names" className="btn-none" onClick={this.selectNone}>解除</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default ConditionalForm;
