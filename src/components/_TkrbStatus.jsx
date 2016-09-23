import React from 'react';
import config from '../config';
import ConditionalForm from './form/ConditionalForm';
import StatusGraph from './graph/StatusGraph';
import HelpModal from './help/HelpModal';
import ControlPanel from './newform/ControlPanel';

/**
 * TkrbStatus component
 * A wrapper component
 */
class TkrbStatus extends React.Component {
  constructor(props) {
    super(props);

    // set state
    this.state = {
      isHelpPanelOpen: false,
      statusType: 'initial',
      type: config.labels.type,
      family: config.labels.family,
      rare: config.labels.rare,
      name: [],
      status: Object.keys(config.labels.status),
      isOldStatus: false,
      isControlPanelOpen: false,
    };

    // bind 'this' to the methods
    this.handleStatusTypeChange = this.handleStatusTypeChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.toggleStatusModeChange = this.toggleStatusModeChange.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  componentDidUpdate() {
    // adds a class to the body for usability
    document.body.className = this.state.isHelpPanelOpen ? 'noscroll' : '';
  }

  // handles a status type change notification
  handleStatusTypeChange(type) {
    this.setState({ statusType: type });
  }

  // handles a condition change notification
  handleConditionChange(condition) {
    this.setState(condition);
  }

  // handles a status mode change notification
  toggleStatusModeChange() {
    this.setState({ isOldStatus: !this.state.isOldStatus });
  }

  // handles a help display state change notification
  toggleHelp(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ isHelpPanelOpen: !this.state.isHelpPanelOpen });
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
          onStatusTypeChange={this.handleStatusTypeChange}
          onStatusModeChange={this.toggleStatusModeChange}
          onConditionChange={this.handleConditionChange}
        />
        <StatusGraph condition={this.state} data={this.props.data} />
        <HelpModal show={this.state.isHelpPanelOpen} onCloseClick={this.toggleHelp} />
        <ControlPanel condition={this.state} />
      </div>
    );
  }
}

export default TkrbStatus;
