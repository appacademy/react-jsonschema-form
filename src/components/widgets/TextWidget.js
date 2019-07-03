import React from "react";
import PropTypes from "prop-types";
import AutocompleteWidget from "./AutocompleteWidget";

function TextWidget(props) {
  const { BaseInput } = props.registry.widgets;
  if (props.schema.autocomplete) {
    return <AutocompleteWidget {...props} />;
  }
  return <BaseInput {...props} />;
}

if (process.env.NODE_ENV !== "production") {
  TextWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
  };
}

export default TextWidget;
