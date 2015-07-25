var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var helpMd = require('../data/help');

module.exports = React.createClass({
  closeHelp: function(e) {
    e.preventDefault();
    this.props.onCloseClick();
  },
  render: function() {
    var _help = null;

    if (this.props.show) {
      _help = (
        <div id="status-help">
          <div className="help-body" dangerouslySetInnerHTML={{__html: helpMd}} />
          <div className="help-close">
            <a onClick={this.closeHelp}>ヘルプをとじる</a>
          </div>
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName="status-help">
        {_help}
      </ReactCSSTransitionGroup>
    );
  }
});
