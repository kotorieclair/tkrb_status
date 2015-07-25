var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ = {
  includes: require('lodash/collection/includes')
}
var StatusBar = require('./statusBar');
var GraphBack = require('./graphBack');
var FiltersMixin = require('./mixins').FiltersMixin;

// filter data and create graph
module.exports = React.createClass({
  mixins: [FiltersMixin],
  render: function() {
    var status = this.props.data.map(function(item) {
      if (this.props.condition.names.length > 0) {
        if (!this._namesFilter(item)) {
          return false;
        }
      } else {
        if(!this._typeFilter(item) || !this._familyFilter(item) || !this._rareFilter(item)) {
          return false;
        }
      }

      var n = 0;
      var bars = Object.keys(item[this.props.condition.statusType]).map(function(key) {
        // filter by status
        if (!_.includes(this.props.condition.status, key)) {
          return false;
        }

        n += item[this.props.condition.statusType][key];

        return (
          <StatusBar maxStatus={this.props.config.maxStatus} statusType={this.props.condition.statusType} item={item} name={key} key={key} />
        )
      }.bind(this));

      // create graphs for each character
      return (
        <div className={"status-graph-item bars-" + bars.length} key={item.id}>
          <div className="status-bar-box">
            <ReactCSSTransitionGroup transitionName="status-bar" transitionAppear={true}>
              {bars}
            </ReactCSSTransitionGroup>
          </div>
          <div className="status-info-box">
            <p className="info-name">
              <a href={item.url1} target="_new">{item.name}</a>
            </p>
            <p className="info-id">
              No. {item.id}
            </p>
            <p className="info-total">
              合計：{n}
            </p>
          </div>
        </div>
      );
    }.bind(this));

    return (
      <div id="status-graph">
        <div id="status-graph-box">
          <ReactCSSTransitionGroup transitionName="status-graph" transitionAppear={true}>
            {status}
          </ReactCSSTransitionGroup>
        </div>
        <GraphBack />
      </div>
    );
  }
});
