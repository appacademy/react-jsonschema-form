import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

class BaseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      options: [
        {
          value: "test",
          label: "Test",
        },
      ],
    };
  }

  onChange = e => {
    this.setState({ value: e });
    this.props.onChange(e.value);
  };

  onInputChange = e => {
    this.props.schema.fetchOptions(e).then(data => {
      console.log(data);
      this.setState({ options: data });
    });
  };

  render() {
    const { props } = this;

    // Note: since React 15.2.0 we can't forward unknown element attributes, so we
    // exclude the "options" and "schema" ones here.
    if (!props.id) {
      console.log("No id for", props);
      throw new Error(`no id for props ${JSON.stringify(props)}`);
    }
    const {
      value,
      readonly,
      disabled,
      autofocus,
      onBlur,
      onFocus,
      options,
      schema,
      formContext,
      registry,
      ...inputProps
    } = props;

    inputProps.type = options.inputType || inputProps.type || "text";
    const _onChange = ({ target: { value } }) =>
      props.onChange(value === "" ? options.emptyValue : value);

    const { rawErrors, ...cleanProps } = inputProps;
    if (props.schema.autocomplete) {
      return (
        <Select
          value={this.state.value}
          onChange={this.onChange}
          options={this.state.options}
          onInputChange={this.onInputChange}
        />
      );
    }
    return (
      <input
        className="form-control"
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autofocus}
        value={value == null ? "" : value}
        {...cleanProps}
        onChange={_onChange}
        onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
        onFocus={
          onFocus && (event => onFocus(inputProps.id, event.target.value))
        }
      />
    );
  }
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default BaseInput;
