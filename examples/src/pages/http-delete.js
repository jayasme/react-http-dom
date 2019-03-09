import React, { Component } from 'react';

import { HttpDelete } from '../../../lib';

class HttpDeletePage extends Component {
  state = {
    loading: false,
  };

  render() {
    const self = this;
    return (
      <HttpDelete>
        {({ sendDelete }) => {
          const onSendDelete = () => {
            self.setState({ loading: true });
            sendDelete({
              uri: 'http://httpbin.org/delete',
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
                <button type="button" onClick={onSendDelete} disabled={loading}>
                  Send Delete Request
                </button>
              </p>
            </div>
          );
        }}
      </HttpDelete>
    );
  }
}

export default HttpDeletePage;
