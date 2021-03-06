import React from 'react';

import { HttpGet } from '../../../lib';

const HttpGetPage = () => (
  <HttpGet uri="http://httpbin.org/get?query=1">
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

      return <pre>{data}</pre>;
    }}
  </HttpGet>
);

export default HttpGetPage;
