import React from "react";
import Select from "react-select";
import fuzzysearch from "fuzzysearch";

/* This preloaded autocomplete widget makes one fetch for all possible options
and then uses those options. This should only be used when the number
of options is fairly small (ie. <500) */

export default class PreloadedAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      possibleOptionsCache: [],
      options: [{}],
    };
    this.fetchOptions = this.props.schema.fetchOptions;
  }

  componentDidMount() {
    // fetchOptions once
    // cache it in a global cache of the options.
    // on input change search in the cache of options'
    this.fetchOptions().then(possibleOptions => {
      const possibleOptionsCache = possibleOptions.map(option => ({
        value: option,
        label: option,
      }));
      this.setState({ possibleOptionsCache });
    });
  }

  onInputChange = e => {
    const options = this.state.possibleOptionsCache.filter(option =>
      fuzzysearch(e, option.label)
    );
    this.setState({ options });
  };

  onChange = e => {
    this.setState({ selectedOption: e });
    this.props.onChange(e.value);
  };

  render() {
    const { selectedOption, options } = this.state;

    return (
      <Select
        placeholder="Search..."
        value={selectedOption}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        options={options}
      />
    );
  }
}
