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
      this.setState({
        activeTab: null,
      });
    }

    this.props.onChangeTab(activeTab);
  }

  render() {
    const tabBodies = this.props.children.map((child) => {
      const tabName = child.props.tabName;
      const isActive = tabName === this.state.activeTab ? ' active' : '';

      return (
        <fieldset className={`FormTab-tab${isActive}`} key={tabName} data-tab={tabName}>
          <legend className="FormTab-heading" onClick={this.changeTab}>
            {child.props.heading}<i className="fa fa-caret-down" />
          </legend>
          <div className="FormTab-body">
            {child.props.children}
          </div>
        </fieldset>
      );
    });

    return (
      <div className="FormTab">
        {tabBodies}
      </div>
    );
  }
}

export default FormTab;
