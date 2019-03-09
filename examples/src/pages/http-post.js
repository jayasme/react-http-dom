import React, { Component } from 'react';

import { HttpPost } from '../../../lib';

class HttpPostPage extends Component {
  state = {
    loading: false,
  };

  render() {
    const self = this;
    return (
      <HttpPost>
        {({ sendPostData, sendPostJson, sendPostForm }) => {
          const onPostData = () => {
            self.setState({ loading: true });
            sendPostData({
              uri: 'http://httpbin.org/post',
              data: 'key1=value1&key2=value2',
              headers: {
                'Content-Type': 'html/text',
              },
              onResponse: response => {
                self.setState({ loading: false });
                alert(response);
              },
              onError: error => {
                self.setState({ loading: false });
                alert(`Error: ${error.message}`);
              },
            });
          };
          const onPostJson = () => {
            self.setState({ loading: true });
            sendPostJson({
              uri: 'http://httpbin.org/post',
              json: {
                key1: 'value1',
                key2: 'value2',
              },
              onResponse: response => {
                self.setState({ loading: false });
                alert(JSON.stringify(response));
              },
              onError: error => {
                self.setState({ loading: false });
                alert(`Error: ${error.message}`);
              },
            });
          };

          const onPostForm = e => {
            const file = e.target.files[0];
            self.setState({ loading: true });
            sendPostForm({
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
                self.setState({ loading: false });
                alert(response);
              },
              onError: error => {
                self.setState({ loading: false });
                alert(`Error: ${error.message}`);
              },
            });
          };

          const { loading } = this.state;
          return (
            <div>
              <p>
                <button type="button" onClick={onPostData} disabled={loading}>
                  Send raw data POST request
                </button>
              </p>
              <p>
                <button type="button" onClick={onPostJson} disabled={loading}>
                  Send JSON POST request
                </button>
              </p>
              <p>
                Send Form-data POST request:
                <input type="file" onChange={onPostForm} disabled={loading} />
              </p>
            </div>
          );
        }}
      </HttpPost>
    );
  }
}

export default HttpPostPage;
