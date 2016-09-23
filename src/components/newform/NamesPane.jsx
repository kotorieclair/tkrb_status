import React from 'react';
import config from '../../config';
// import filters from '../../helpers/filters';
// import FormTab from './FormTab';
// import FormCheckRadio from './FormCheckRadio';

/**
 * NamesPane component
 * A form to set the conditionals for the data display
 */
class NamesPane extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'NamesPane';

    this.initialSuggestedNames = {
      index: null,
      names: [],
    };

    // set state
    this.state = {
      suggestedNames: this.initialSuggestedNames,
    };
  }

  // notifies the names change to the parent
  setNameFilter() {
    // creates an array of the inputted names
    const input = this._nameInput.value;
    const names = input.length ? input.split(',') : [];

    this.props.onConditionChange({ name: names });

    // suggests the name completion
    this.suggestNames(names);
  }

  // suggests the name completion
  suggestNames(inputs) {
    const suggestedNames = {...this.initialSuggestedNames};

    // returns the suggestion only for the first incomplete name in the inputs
    inputs.some((input, index) => {
      if (!input) {
        return false;
      }

      const filteredNames = [];
      this.props.data.forEach((item) => {
        // don't include the name already in the inputs
        if (!filters.name(item.name, this.props.condition)) {
          if (item.name.match(input)) {
            filteredNames.push(item.name);
          }
        }
      });

      if (filteredNames.length) {
        suggestedNames.index = index;
        suggestedNames.names = filteredNames;
        return true;
      }

      return false;
    });

    this.setState({suggestedNames});
  }

  // adds the suggested name to the names input
  addSuggestedName(e) {
    const name = e.currentTarget.getAttribute('data-name');

    const _names = this.props.condition.name;
    const index = this.state.suggestedNames.index;
    const names = _names.slice(0, index).concat(name, _names.slice(index + 1));

    this.props.onConditionChange({ name: names });

    this.setState({ suggestedNames: this.initialSuggestedNames });
  }

  render() {
    return(
      <div className={this.name}>
        names pane
      </div>
    );
  }
}

export default NamesPane;
