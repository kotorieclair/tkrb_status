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
    return (
      <div>
        <header>
          <h1>刀剣乱舞ぬるぬる動くステータス</h1>
          <nav>
            <ul>
              <li>
                <a onClick={this.toggleHelp}>
                  <i className="fa fa-question"></i>ヘルプ
                </a>
              </li>
              <li>
                <s><i className="fa fa-github"></i>GitHub</s>
              </li>
            </ul>
          </nav>
        </header>
        <ConditionalForm
          onStatusTypeChange={this.handleStatusType}
          onStatusModeChange={this.toggleStatusMode}
          onConditionChange={this.handleCondition}
          condition={this.state}
          data={this.props.data}
        />
        <StatusGraph
          condition={this.state}
          data={this.props.data}
        />
        <HelpModal show={this.state.showHelp} onCloseClick={this.toggleHelp} />
      </div>
    );
  }
}

export default TkrbStatus;
