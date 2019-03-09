import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withHttpPut } from '../../../lib';

class WithHttpPutPage extends Component {
  state = {
    loading: false,
  };

  onPutData = () => {
    this.setState({ loading: true });
    this.props.sendPutData({
      uri: 'http://httpbin.org/put',
      data: 'key1=value1&key2=value2',
      headers: {
        'Content-Type': 'html/text',
      },
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

  onPutJson = () => {
    this.setState({ loading: true });
    this.props.sendPutJson({
      uri: 'http://httpbin.org/put',
      json: {
        key1: 'value1',
        key2: 'value2',
      },
      onResponse: response => {
        this.setState({ loading: false });
        alert(JSON.stringify(response));
      },
      onError: error => {
        this.setState({ loading: false });
        alert(`Error: ${error.message}`);
      },
    });
  };

  onPutForm = e => {
    const file = e.target.files[0];
    this.setState({ loading: true });
    this.props.sendPutForm({
      uri: 'http://httpbin.org/put',
      form: {
        key1: 'value1',
        key2: 'value2',
        file1: {
          value: file,
          options: {
            filename: file.name,
            contentType: file.type,
          },
        },
      },
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
          <button type="button" onClick={this.onPutData} disabled={loading}>
            Send raw data PUT request
          </button>
        </p>
        <p>
          <button type="button" onClick={this.onPutJson} disabled={loading}>
            Send JSON PUT request
          </button>
        </p>
        <p>
          Send Form-data PUT request:
          <input type="file" onChange={this.onPutForm} disabled={loading} />
        </p>
      </div>
    );
  }
}

WithHttpPutPage.propTypes = {
  sendPutData: PropTypes.func.isRequired,
  sendPutJson: PropTypes.func.isRequired,
  sendPutForm: PropTypes.func.isRequired,
};

export default withHttpPut()(WithHttpPutPage);
