import React from "react";
import AsyncCreatable from "react-select/lib/AsyncCreatable";
import AsyncSelect from "react-select/lib/Async";
import debounce from "debounce";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    const { schema, value } = this.props;
    let prefilledOption;
    if (value) {
      prefilledOption = { label: value, value };
    }
    this.state = {
      selectedOption: prefilledOption || null,
    };

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
    const { schema } = this.props;
    const autoCompleteProps = {
      cacheOptions: true,
      placeholder: schema.placeholder || "Search...",
      loadOptions: this.debouncedFetch,
      value: selectedOption,
      onChange: this.onChange,
    };
    if (schema.creatable) {
      return <AsyncCreatable {...autoCompleteProps} />;
    }
    return <AsyncSelect {...autoCompleteProps} />;
  }
}
