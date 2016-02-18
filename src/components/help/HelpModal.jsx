import helpMd from '../../data/help.md';
import React from 'react';
import Markdown from 'react-markdown';
const TransitionGroup = React.addons.CSSTransitionGroup;

class HelpModal extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'HelpModal';

    this.closeHelp = this.closeHelp.bind(this);
  }

  closeHelp(e) {
    e.preventDefault();
    this.props.onCloseClick();
  }

  render() {
    return (
      <TransitionGroup transitionName={`${this.name}`} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {this.props.show ? (
          <div className={this.name}>
            <div className={`${this.name}_body`}>
              <div className={`${this.name}_body_inner`}>
                <Markdown source={helpMd} />
              </div>
            </div>
            <div className={`${this.name}_close`}>
              <a onClick={this.closeHelp}>
                <i className="fa fa-times" />ヘルプをとじる
              </a>
            </div>
          </div>
        ) : null}
      </TransitionGroup>
    );
  }
}

export default HelpModal;
