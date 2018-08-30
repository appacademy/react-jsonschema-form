import React from "react";
import Select from "react-select";

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
      // initiate new options with the current search to account for
      // case where the current search doesn't exist yet as a company in
      // our database:
      const options = [{ value: e, label: e }];
      data.forEach(company => {
        // TODO: will need to consider fuzzy search:
        if (company.toLowerCase() !== e.toLowerCase()) {
          options.push({
            value: company,
            label: company,
          });
        }
      });

      this.setState({ options });
    });
    console.log(e);
  };

  render() {
    const { selectedOption, options } = this.state;
    return (
      <Select
        value={selectedOption}
        onChange={this.onChange}
        options={options}
        onInputChange={this.onInputChange}
      />
    );
  }
}
