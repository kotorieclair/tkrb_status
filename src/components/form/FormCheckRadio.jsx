import React from 'react';

class FormCheckRadio extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'FormCheckRadio';

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const {change, children, className, ...others} = this.props;
    return (
      <label className={`${this.name}${className ? ' ' + className : ''}`}>
        <input {...others} className={`${this.name}_input`} onChange={this.handleChange} />
        <span className={`${this.name}_text`}>
          <i className="fa fa-check"></i>
          {children}
        </span>
      </label>
    );
  }
}

export default FormCheckRadio;
