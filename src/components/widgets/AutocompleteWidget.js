import React from "react";
import AsyncCreatable from "react-select/lib/AsyncCreatable";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [{}],
    };
    this.fetchOptions = this.props.schema.fetchOptions;
  }

  onChange = e => {
    this.setState({ selectedOption: e });
    this.props.onChange(e.value);
  };

  onInputChange = e => {
    this.fetchOptions(e).then(data => {
      const options = data.map(company => ({
        value: company,
        label: company,
      }));

      this.setState({ options });
    });
  };

  render() {
    const { selectedOption, options } = this.state;
    return (
      <AsyncCreatable
        value={selectedOption}
        onChange={this.onChange}
        options={options}
        onInputChange={this.onInputChange}
      />
    );
  }
}
