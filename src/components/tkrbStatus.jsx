import config from '../config';
import ConditionalForm from './conditionalForm';
import StatusGraph from './statusGraph';
import HelpModal from './helpModal';

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
      names: config.labels.names,
      status: Object.keys(config.labels.status),
      isOldStatus: false,
    };

    // bind 'this' to the methods
    this.handleStatusType = this.handleStatusType.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.toggleStatusMode = this.toggleStatusMode.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  // handles a status type change notification
  handleStatusType(type) {
    this.setState({
      statusType: type,
    });
  }

  // handles a condition change notification
  handleCondition(condition) {
    this.setState(condition);
  }

  // handles a status mode change notification
  toggleStatusMode() {
    this.setState({
      isOldStatus: !this.state.isOldStatus,
    });
  }

  // handles a help display state change notification
  toggleHelp(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      showHelp: !this.state.showHelp,
    });
  }

  render() {
    // defines the props for ConditionalForm component
    const conditionalFormProps = {
      onStatusTypeChange: this.handleStatusType,
      onStatusModeChange: this.toggleStatusMode,
      onConditionChange: this.handleCondition,
      condition: this.state,
      data: this.props.data,
    };

    // adds a class to the body for usability
    if (this.state.showHelp) {
      document.body.className = 'no-scroll';
    } else {
      document.body.className = '';
    }

    return (<div>bbb</div>);
    // return (
    //   <div>
    //     <header>
    //       <h1>刀剣乱舞ぬるぬる動くステータス</h1>
    //       <nav>
    //         <ul>
    //           <li>
    //             <a href="" onClick={this.toggleHelp}>
    //               <i className="fa fa-question" />ヘルプ
    //             </a>
    //           </li>
    //           <li>
    //             <a href="https://github.com/kotorieclair/tkrb_status">
    //               <i className="fa fa-github" />GitHub
    //             </a>
    //           </li>
    //         </ul>
    //       </nav>
    //     </header>
    //     <ConditionalForm {...conditionalFormProps} />
    //     <StatusGraph condition={this.state} data={this.props.data} />
    //     <HelpModal show={this.state.showHelp} onCloseClick={this.toggleHelp} />
    //   </div>
    // );
  }
}

export default TkrbStatus;
