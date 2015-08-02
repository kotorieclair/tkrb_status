var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var helpMd = require('../data/help');

module.exports = React.createClass({
  closeHelp: function(e) {
    e.preventDefault();
    this.props.onCloseClick();
  },
  render: function() {
    return (
      <div id="status-help" className={this.props.show ? 'help-show' : 'help-hide'}>
        <div className="help-body" dangerouslySetInnerHTML={{__html: helpMd}} />
        <div className="help-close">
          <a onClick={this.closeHelp}>ヘルプをとじる</a>
        </div>
      </div>
    );
  }
});
