var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var md2react = require('md2react');
var helpMd = md2react(require('../data/help'), {gfm: true, breaks: true});

module.exports = React.createClass({
  closeHelp: function(e) {
    e.preventDefault();
    this.props.onCloseClick();
  },
  render: function() {
    var _help = null;

    var _md = React.createElement('div', {className: 'help-body'}, [helpMd]);

    return (
      <div id="status-help" className={this.props.show ? 'help-show' : 'help-hide'}>
        {_md}
        <div className="help-close">
          <a onClick={this.closeHelp}>ヘルプをとじる</a>
        </div>
      </div>
    );
  }
});
