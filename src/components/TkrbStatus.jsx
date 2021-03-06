import React from 'react';
import config from '../config';
import ConditionalForm from './form/ConditionalForm';
import StatusGraph from './graph/StatusGraph';
import HelpModal from './help/HelpModal';

/**
 * TkrbStatus component
 * A wrapper component
 */
class TkrbStatus extends React.Component {
  constructor(props) {
    super(props);

    // set state
    this.state = {
      showHelp: false,
      statusType: 'initial',
      type: config.labels.type,
      family: config.labels.family,
      rare: config.labels.rare,
      name: [],
      status: Object.keys(config.labels.status),
      isOldStatus: false,
    };

    // bind 'this' to the methods
    this.handleStatusType = this.handleStatusType.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.toggleStatusMode = this.toggleStatusMode.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  componentDidUpdate() {
    // adds a class to the body for usability
    document.body.className = this.state.showHelp ? 'noscroll' : '';
  }

  // handles a status type change notification
  handleStatusType(type) {
    this.setState({ statusType: type });
  }

  // handles a condition change notification
  handleCondition(condition) {
    this.setState(condition);
  }

  // handles a status mode change notification
  toggleStatusMode() {
    this.setState({ isOldStatus: !this.state.isOldStatus });
  }

  // handles a help display state change notification
  toggleHelp(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ showHelp: !this.state.showHelp });
  }

  render() {
    return (
      <div>
        <header>
          <h1>刀剣乱舞ぬるぬる動くステータス</h1>
          <nav>
            <ul>
              <li>
                <a href="" onClick={this.toggleHelp}>
                  <i className="fa fa-question" />ヘルプ
                </a>
              </li>
              <li>
                <a href="https://github.com/kotorieclair/tkrb_status">
                  <i className="fa fa-github" />GitHub
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <ConditionalForm
          condition={this.state}
          data={this.props.data}
          onStatusTypeChange={this.handleStatusType}
          onStatusModeChange={this.toggleStatusMode}
          onConditionChange={this.handleCondition}
        />
        <StatusGraph condition={this.state} data={this.props.data} />
        <HelpModal show={this.state.showHelp} onCloseClick={this.toggleHelp} />
      </div>
    );
  }
}

export default TkrbStatus;
