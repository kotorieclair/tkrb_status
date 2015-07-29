var ConditionalForm = require('./conditionalForm');
var StatusGraph = require('./statusGraph');
var HelpModal = require('./helpModal');

// wrapper component
module.exports = React.createClass({
  getInitialState: function() {
    return {
      "showHelp": false,
      "statusType": "initial",
      "type": this.props.config.labels.type,
      "family": this.props.config.labels.family,
      "rare": this.props.config.labels.rare,
      "names": this.props.config.labels.names,
      "status": Object.keys(this.props.config.labels.status)
    };
  },
  handleStatusType: function(type) {
    this.setState({"statusType": type});
  },
  handleCondition: function(condition) {
    this.setState(condition);
    // this.setState(_.assign({}, {
    //   "type": this.props.config.labels.type,
    //   "family": this.props.config.labels.family,
    //   "rare": this.props.config.labels.rare,
    //   "names": this.props.config.labels.names
    // }, condition));
  },
  toggleHelp: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({"showHelp": !this.state.showHelp})
  },
  render: function() {
    return (
      <div>
        <header>
          <h1>刀剣乱舞ぬるぬる動くステータス</h1>
          <nav>
            <ul>
              <li><a onClick={this.toggleHelp}><i className="fa fa-question"></i>ヘルプ</a></li>
              <li><s><i className="fa fa-github"></i>GitHub</s></li>
            </ul>
          </nav>
        </header>
        <ConditionalForm onStatusTypeChange={this.handleStatusType} onConditionChange={this.handleCondition} onActiveFieldChange={this.handleActiveField} condition={this.state} data={this.props.data} config={this.props.config} />
        <StatusGraph condition={this.state} data={this.props.data} config={this.props.config} />
        <HelpModal show={this.state.showHelp} onCloseClick={this.toggleHelp} />
      </div>
    );
  }
});
