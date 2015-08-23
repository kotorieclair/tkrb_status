import helpMd from '../data/help';

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
    const className = this.props.show ? 'show' : 'hide';
    return (
      <div id="HelpModal" className={className}>
        <div className="HelpModal-body" dangerouslySetInnerHTML={{__html: helpMd}} />
        <div className="HelpModal-close">
          <a onClick={this.closeHelp}>ヘルプをとじる</a>
        </div>
      </div>
    );
  }
}

export default HelpModal;
