import helpMd from '../data/help';

class HelpModal extends React.Component {
  constructor(props) {
    super(props);

    this.closeHelp = this.closeHelp.bind(this);
  }

  componentWillUpdate(newProps) {
    if (newProps.show) {
      React.findDOMNode(this.refs.helpBody).scrollTop = 0;
    }
  }

  closeHelp(e) {
    e.preventDefault();
    this.props.onCloseClick();
  }

  render() {
    const className = this.props.show ? 'show' : 'hide';
    return (
      <div id="HelpModal" className={className}>
        <div className="HelpModal-body" ref="helpBody">
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
}

export default HelpModal;
