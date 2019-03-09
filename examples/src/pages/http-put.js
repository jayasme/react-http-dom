import React, { Component } from 'react';

import { HttpPut } from '../../../lib';

class HttpPutPage extends Component {
  state = {
    loading: false,
  };

  render() {
    const self = this;
    return (
      <HttpPut>
        {({ sendPutData, sendPutJson, sendPutForm }) => {
          const onPutData = () => {
            self.setState({ loading: true });
            sendPutData({
              uri: 'http://httpbin.org/put',
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
          const onPutJson = () => {
            self.setState({ loading: true });
            sendPutJson({
              uri: 'http://httpbin.org/put',
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

          const onPutForm = e => {
            const file = e.target.files[0];
            self.setState({ loading: true });
            sendPutForm({
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
                <button type="button" onClick={onPutData} disabled={loading}>
                  Send raw data PUT request
                </button>
              </p>
              <p>
                <button type="button" onClick={onPutJson} disabled={loading}>
                  Send JSON PUT request
                </button>
              </p>
              <p>
                Send Form-data PUT request:
                <input type="file" onChange={onPutForm} disabled={loading} />
              </p>
            </div>
          );
        }}
      </HttpPut>
    );
  }
}

export default HttpPutPage;
