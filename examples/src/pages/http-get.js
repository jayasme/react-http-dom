import React from 'react';
import { HttpGet } from 'react-http-dom';

const HttpGetPage = () => (
  <HttpGet uri="http://httpbin.org/get">
    {({ loading, data, error }) => {
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
    }}
  </HttpGet>
);

export default HttpGetPage;
