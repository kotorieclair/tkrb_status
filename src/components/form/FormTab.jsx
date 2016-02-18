import React from 'react';

class FormTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'status',
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(e) {
    const activeTab = e.currentTarget.parentNode.getAttribute('data-tab');

    if (activeTab !== this.state.activeTab) {
      this.setState({activeTab});
    } else {
      this.setState({ activeTab: null });
    }

    this.props.onChangeTab(activeTab);
  }

  render() {
    return (
      <div className="FormTab">
        {this.props.children.map((child) => {
          const { tabName, heading, children } = child.props;
          const isActive = tabName === this.state.activeTab ? ' active' : '';

          return (
            <fieldset className={`FormTab-tab${isActive}`} key={tabName} data-tab={tabName}>
              <legend className="FormTab-heading" onClick={this.changeTab}>
                {heading}<i className="fa fa-caret-down" />
              </legend>
              <div className="FormTab-body">
                {children}
              </div>
            </fieldset>
          );
        })}
      </div>
    );
  }
}

export default FormTab;
