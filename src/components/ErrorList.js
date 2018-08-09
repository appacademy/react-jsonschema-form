import React from "react";

const ErrorList = ({ errors }) => (
  <div className="panel panel-danger errors error-snackbar">
    {errors[0].stack}
  </div>
);

export default ErrorList;
