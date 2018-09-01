import React from "react";
import AsyncCreatable from "react-select/lib/AsyncCreatable";
import debounce from "debounce";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };

    const { schema } = this.props;
    const { fetchOptions, debounceDuration = 0 } = schema;

    this.debouncedFetch = debounce((inputValue, callback) => {
      fetchOptions(inputValue).then(result => {
        const options = result.map(el => ({ label: el, value: el }));
        callback(options);
      });
    }, parseInt(debounceDuration, 10));
  }

  onChange = e => {
    this.setState({ selectedOption: e });
    this.props.onChange(e.value);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <AsyncCreatable
        cacheOptions
        placeholder="Search..."
        loadOptions={this.debouncedFetch}
        value={selectedOption}
        onChange={this.onChange}
      />
    );
  }
}
