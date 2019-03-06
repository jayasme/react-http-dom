import React from 'react';
import { withHttpGet } from 'react-http-dom';

const WithHttpGetPage = ({ loading, data, error }) => {
  if (error) {
    return (
      <div>
        <div>Oops, we had an error!</div>
        <div>{`Error: ${error.message}`}</div>
      </div>
    );
  }

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return JSON.stringify(data);
};

export default withHttpGet({ uri: 'http://httpbin.org/get' })(WithHttpGetPage);
