var _ = {
  includes: require('lodash/collection/includes')
  // escape: require('lodash/string/escape')
};

var FormCheckRadio = require('./FormCheckRadio');

// form: setting conditions
module.exports = React.createClass({
  // get all checked checkboxes
  _checkboxFilter: function(cond) {
    var _chbx = React.findDOMNode(this).querySelectorAll('[name="' + cond + '"]');
    var _arr = [];
    for (var i = 0 ; i < _chbx.length ; i++) {
      if (_chbx[i].checked) {
        _arr.push(_chbx[i].value);
      }
    }
    return _arr
  },
  getInitialState: function() {
    return {
      "activeField": "statusType"
    };
  },
  // set status type
  setStatusType: function(e) {
    this.props.onStatusTypeChange(e.target.value);
  },
  // set checked type filter
  setTypeFilter: function(e) {
    var _type = this._checkboxFilter('type');
    this.props.onConditionChange({"type": _type});
  },
  // set checked family filter
  setFamilyFilter: function(e) {
    var _family = this._checkboxFilter('family');
    this.props.onConditionChange({"family": _family});
  },
  // set checked family filter
  setRareFilter: function(e) {
    var _rare = this._checkboxFilter('rare');
    _rare = _rare.map(function(n) {
      return parseInt(n)
    });
    this.props.onConditionChange({"rare": _rare});
  },
  // set inputted names filter
  setNamesFilter: function(e) {
    // var _input = _.escape(React.findDOMNode(this.refs.names).value);
    var _input = React.findDOMNode(this.refs.names).value;
    var _names = [];
    if (_input.length > 0) {
      _names = _input.split(',');
    } else {
      _names = []
    }
    this.props.onConditionChange({"names": _names});
  },
  // select all items
  selectAll: function(e) {
    e.preventDefault();
    var _tmp = {};
    _tmp[e.target.value] = this.props.config.labels[e.target.value];
    this.props.onConditionChange(_tmp);
  },
  // deselect
  selectNone: function(e) {
    e.preventDefault();
    var _tmp = {};
    _tmp[e.target.value] = [];
    this.props.onConditionChange(_tmp);
  },
  // active input field
  changeField: function(e) {
    this.setState({"activeField": e.target.getAttribute("data-field")});
  },
  render: function() {
    var _statusTypeInput = Object.keys(this.props.config.labels.statusType).map(function(item) {
      return (
        <FormCheckRadio key={item} type="radio" name="statusType" value={item} checked={this.props.condition.statusType == item} change={this.setStatusType}>
          {this.props.config.labels.statusType[item]}
        </FormCheckRadio>
      );
    }.bind(this));

    var _typeInput = this.props.config.labels.type.map(function(item) {
      return (
        <FormCheckRadio key={item} type="checkbox" name="type" value={item} checked={_.includes(this.props.condition.type, item)} change={this.setTypeFilter}>
          {item}
        </FormCheckRadio>
      );
    }.bind(this));

    var _familyInput = this.props.config.labels.family.map(function(item) {
      return (
        <FormCheckRadio key={item} type="checkbox" name="family" value={item} checked={_.includes(this.props.condition.family, item)} change={this.setFamilyFilter}>
          {item}
        </FormCheckRadio>
      );
    }.bind(this));

    var _rareInput = this.props.config.labels.rare.map(function(item) {
      return (
        <FormCheckRadio key={item} type="checkbox" name="rare" value={item} checked={_.includes(this.props.condition.rare, item)} change={this.setRareFilter}>
          レア{item}
        </FormCheckRadio>
      );
    }.bind(this));

    return (
      <form id="status-form" className={"active-" + this.state.activeField}>
        <h2>表示条件を変更</h2>
        <fieldset>
          <legend onClick={this.changeField} data-field="statusType">表示ステータス</legend>
          <div className="input-box">
            {_statusTypeInput}
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="type">刀種</legend>
          <div className="input-box">
            {_typeInput}
            <button value="type" className="btn-all" onClick={this.selectAll}>全選択</button>
            <button value="type" className="btn-none" onClick={this.selectNone}>全解除</button>
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="family">刀派</legend>
          <div className="input-box">
            {_familyInput}
            <button value="family" className="btn-all" onClick={this.selectAll}>全選択</button>
            <button value="family" className="btn-none" onClick={this.selectNone}>全解除</button>
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="rare">レアリティ</legend>
          <div className="input-box">
            {_rareInput}
            <button value="rare" className="btn-all" onClick={this.selectAll}>全選択</button>
            <button value="rare" className="btn-none" onClick={this.selectNone}>全解除</button>
          </div>
        </fieldset>
        <fieldset>
          <legend onClick={this.changeField} data-field="names">刀剣名</legend>
          <div className="input-box">
            <input type="text" ref="names" value={this.props.condition.names.join(',')} placeholder="半角カンマ区切り（空白なし）" onChange={this.setNamesFilter} />
            <button value="names" className="btn-none" onClick={this.selectNone}>解除</button>
          </div>
        </fieldset>
      </form>
    );
  }
});
