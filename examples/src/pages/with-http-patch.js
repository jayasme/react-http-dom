import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withHttpPatch } from '../../../lib';

class WithHttpPatchPage extends Component {
  state = {
    loading: false,
  };

  onPatchData = () => {
    this.setState({ loading: true });
    this.props.sendPatchData({
      uri: 'http://httpbin.org/patch',
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

  onPatchJson = () => {
    this.setState({ loading: true });
    this.props.sendPatchJson({
      uri: 'http://httpbin.org/patch',
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

  onPatchForm = e => {
    const file = e.target.files[0];
    this.setState({ loading: true });
    this.props.sendPatchForm({
      uri: 'http://httpbin.org/patch',
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
          <button type="button" onClick={this.onPatchData} disabled={loading}>
            Send raw data PATCH request
          </button>
        </p>
        <p>
          <button type="button" onClick={this.onPatchJson} disabled={loading}>
            Send JSON PATCH request
          </button>
        </p>
        <p>
          Send Form-data PATCH request:
          <input type="file" onChange={this.onPatchForm} disabled={loading} />
        </p>
      </div>
    );
  }
}

WithHttpPatchPage.propTypes = {
  sendPatchData: PropTypes.func.isRequired,
  sendPatchJson: PropTypes.func.isRequired,
  sendPatchForm: PropTypes.func.isRequired,
};

export default withHttpPatch()(WithHttpPatchPage);
