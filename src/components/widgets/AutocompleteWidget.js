import React from "react";
import AsyncCreatable from "react-select/lib/AsyncCreatable";
import PreloadedAutocompleteWidget from "./PreloadedAutocompleteWidge";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
    this.fetchOptions = this.props.schema.fetchOptions;
  }

  onChange = e => {
    this.setState({ selectedOption: e });
    this.props.onChange(e.value);
  };

  loadOptions = inputValue =>
    new Promise(resolve => {
      this.fetchOptions(inputValue).then(data => {
        const options = data.map(el => ({ label: el, value: el }));
        resolve(options);
      });
    });

  render() {
    const { selectedOption, options } = this.state;
    const {
      schema: { preloaded },
    } = this.props;
    if (preloaded) {
      return <PreloadedAutocompleteWidget {...this.props} />;
    }
    return (
      <AsyncCreatable
        cacheOptions
        placeholder="Search..."
        loadOptions={this.loadOptions}
        value={selectedOption}
        onChange={this.onChange}
      />
    );
  }
}
