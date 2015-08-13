class FormCheckRadio extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const {change, children, className, ...others} = this.props;
    return (
      <label className={className}>
        <input {...others} onChange={this.handleChange} />
        <span>
          <i className="fa fa-check"></i>
          {children}
        </span>
      </label>
    )
  }
}

export default FormCheckRadio;
