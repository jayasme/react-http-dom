import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withHttpDelete } from '../../../lib';

class WithHttpDeletePage extends Component {
  state = {
    loading: false,
  };

  onSendDelete = () => {
    this.setState({ loading: true });
    this.props.sendDelete({
      uri: 'http://httpbin.org/delete',
      onResponse: response => {
        this.setState({ loading: false });
        alert(response);
      },
      onError: error => {
        this.setState({ loading: false });
        alert(`Error: ${error.message}`);
      },
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <p>
          <button type="button" onClick={this.onSendDelete} disabled={loading}>
            Send Delete Request
          </button>
        </p>
      </div>
    );
  }
}

WithHttpDeletePage.propTypes = {
  sendDelete: PropTypes.func.isRequired,
};

export default withHttpDelete()(WithHttpDeletePage);
