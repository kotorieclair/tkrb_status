class FormCheckRadio extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.change(e);
  }

  render() {
    const {change, children, ...others} = this.props;
    return (
      <label>
        <input {...others} onChange={this.handleChange} />
        <span>
          <i className="fa fa-check"></i>
          {this.props.children}
        </span>
      </label>
    )
  }
}

export default FormCheckRadio;
