import React from "react";

class ErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: false }), 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors[0]) {
      this.setState({ visible: true }, () => {
        setTimeout(() => this.setState({ visible: false }), 3000);
      });
    }
  }

  render() {
    const { errors } = this.props;
    const { visible } = this.state;

    return (
      <div className={`panel panel-danger errors error-snackbar-${visible}`}>
        {errors[0].stack}
      </div>
    );
  }
}

export default ErrorList;
