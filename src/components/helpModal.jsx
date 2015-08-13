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
    return (
      <div id="status-help" className={this.props.show ? 'help-show' : 'help-hide'}>
        <div className="help-body" dangerouslySetInnerHTML={{__html: helpMd}} />
        <div className="help-close">
          <a onClick={this.closeHelp}>ヘルプをとじる</a>
        </div>
      </div>
    );
  }
}

export default HelpModal;
