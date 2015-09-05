import helpMd from '../data/help';
const TransitionGroup = React.addons.CSSTransitionGroup;

class HelpModal extends React.Component {
  constructor(props) {
    super(props);

    this.closeHelp = this.closeHelp.bind(this);
  }

  closeHelp(e) {
    e.preventDefault();
    this.props.onCloseClick();
  }

  render() {
    let help = null;
    if (this.props.show) {
      help = (
        <div id="HelpModal">
          <div className="HelpModal-body">
            <div className="HelpModal-body-inner" dangerouslySetInnerHTML={{__html: helpMd}} />
          </div>
          <div className="HelpModal-close">
            <a onClick={this.closeHelp}>
              <i className="fa fa-times" />ヘルプをとじる
            </a>
          </div>
        </div>
      );
    }
    return (
      <TransitionGroup transitionName="HelpModal">
        {help}
      </TransitionGroup>
    );
  }
}

export default HelpModal;
