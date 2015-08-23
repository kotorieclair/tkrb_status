// import config from '../config';

class FormTab extends React.Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab() {
    this.props.onChangeTab(this.props.tabName);
  }

  render() {
    const isActive = this.props.tabName === this.props.activeTab;
    const className = isActive ? ' active' : '';
    return (
      <fieldset className={`FormTab ${this.props.tabName}${className}`}>
        <legend className="FormTab-heading" onClick={this.changeTab}>
          {this.props.heading}<i className={`fa fa-caret-down`} />
        </legend>
        <div className="FormTab-body">
          {this.props.children}
        </div>
      </fieldset>
    );
  }
}

export default FormTab;
