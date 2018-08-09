import React from "react";

export default class ErrorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true,
    };
  }

  closeModal = () => {
    this.setState({ opened: false });
  };

  render() {
    const { errors } = this.props;
    const { opened } = this.state;
    return (
      <div className={`panel panel-danger errors error-modal-${opened}`}>
        <div className="error-modal-content">
          <div className="panel-heading">
            <h3 className="panel-title">Errors</h3>
          </div>
          <ul className="list-group">
            {errors.map((error, i) => (
              <li key={i} className="list-group-item text-danger">
                {error.stack}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="close-modal-button"
            onClick={this.closeModal}>
            Got it!
          </button>
        </div>
      </div>
    );
  }
}
