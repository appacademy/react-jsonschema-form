import React from "react";
import Select from "react-select";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [{}],
    };
  }

  onChange = e => {
    this.setState({ selectedOption: e });
    this.props.onChange(e.value);
  };

  onInputChange = e => {
    // this.props.schema.fetchOptions(e).then(data => {
    //   console.log(data);
    //   this.setState({ options: data });
    // });
    this.props.schema.fetchOptions();
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
