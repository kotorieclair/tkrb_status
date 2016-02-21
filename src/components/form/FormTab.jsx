import React from 'react';

class FormTab extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'FormTab';

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
      <div className={this.name}>
        {this.props.children.map((child) => {
          const { tabName, heading, children } = child.props;
          const activeClass = tabName === this.state.activeTab ? ' active' : '';

          return (
            <fieldset className={`${this.name}_tab`} key={tabName} data-tab={tabName}>
              <legend className={`${this.name}_tab_heading${activeClass}`} onClick={this.changeTab}>
                {heading}<i className="fa fa-caret-down" />
              </legend>
              <div className={`${this.name}_tab_body${activeClass}`}>
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
