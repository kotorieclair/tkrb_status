import config from '../config';
import ConditionalForm from './conditionalForm';
import StatusGraph from './statusGraph';
import HelpModal from './helpModal';

// wrapper component
class TkrbStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHelp: false,
      statusType: 'initial',
      type: config.labels.type,
      family: config.labels.family,
      rare: config.labels.rare,
      names: config.labels.names,
      status: Object.keys(config.labels.status),
      isOldStatus: false,
    };

    this.handleStatusType = this.handleStatusType.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.toggleStatusMode = this.toggleStatusMode.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  handleStatusType(type) {
    this.setState({
      statusType: type,
    });
  }

  handleCondition(condition) {
    this.setState(condition);
  }

  toggleStatusMode() {
    this.setState({
      isOldStatus: !this.state.isOldStatus,
    });
  }

  toggleHelp(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      showHelp: !this.state.showHelp,
    });
  }

  render() {
    const props = {
      onStatusTypeChange: this.handleStatusType,
      onStatusModeChange: this.toggleStatusMode,
      onConditionChange: this.handleCondition,
      condition: this.state,
      data: this.props.data,
    };

    if (this.state.showHelp) {
      document.body.className = 'no-scroll';
    } else {
      document.body.className = '';
    }

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
        <ConditionalForm {...props} />
        <StatusGraph condition={this.state} data={this.props.data} />
        <HelpModal show={this.state.showHelp} onCloseClick={this.toggleHelp} />
      </div>
    );
  }
}

export default TkrbStatus;
