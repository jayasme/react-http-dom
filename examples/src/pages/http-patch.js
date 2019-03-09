import React, { Component } from 'react';

import { HttpPatch } from '../../../lib';

class HttpPatchPage extends Component {
  state = {
    loading: false,
  };

  render() {
    const self = this;
    return (
      <HttpPatch>
        {({ sendPatchData, sendPatchJson, sendPatchForm }) => {
          const onPatchData = () => {
            self.setState({ loading: true });
            sendPatchData({
              uri: 'http://httpbin.org/patch',
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
          const onPatchJson = () => {
            self.setState({ loading: true });
            sendPatchJson({
              uri: 'http://httpbin.org/patch',
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

          const onPatchForm = e => {
            const file = e.target.files[0];
            self.setState({ loading: true });
            sendPatchForm({
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
                <button type="button" onClick={onPatchData} disabled={loading}>
                  Send raw data PATCH request
                </button>
              </p>
              <p>
                <button type="button" onClick={onPatchJson} disabled={loading}>
                  Send JSON PATCH request
                </button>
              </p>
              <p>
                Send Form-data PATCH request:
                <input type="file" onChange={onPatchForm} disabled={loading} />
              </p>
            </div>
          );
        }}
      </HttpPatch>
    );
  }
}

export default HttpPatchPage;
