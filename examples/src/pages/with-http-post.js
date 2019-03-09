import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withHttpPost } from '../../../lib';

class WithHttpPostPage extends Component {
  state = {
    loading: false,
  };

  onPostData = () => {
    this.setState({ loading: true });
    this.props.sendPostData({
      uri: 'http://httpbin.org/post',
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

  onPostJson = () => {
    this.setState({ loading: true });
    this.props.sendPostJson({
      uri: 'http://httpbin.org/post',
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

  onPostForm = e => {
    const file = e.target.files[0];
    this.setState({ loading: true });
    this.props.sendPostForm({
      uri: 'http://httpbin.org/post',
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
          <button type="button" onClick={this.onPostData} disabled={loading}>
            Send raw data POST request
          </button>
        </p>
        <p>
          <button type="button" onClick={this.onPostJson} disabled={loading}>
            Send JSON POST request
          </button>
        </p>
        <p>
          Send Form-data POST request:
          <input type="file" onChange={this.onPostForm} disabled={loading} />
        </p>
      </div>
    );
  }
}

WithHttpPostPage.propTypes = {
  sendPostData: PropTypes.func.isRequired,
  sendPostJson: PropTypes.func.isRequired,
  sendPostForm: PropTypes.func.isRequired,
};

export default withHttpPost()(WithHttpPostPage);
