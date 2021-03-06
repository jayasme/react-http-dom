import React from 'react';
import PropTypes from 'prop-types';

import { withHttpGet } from '../../../lib';

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

  return <pre>{data}</pre>;
};

WithHttpGetPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default withHttpGet({
  uri: 'http://httpbin.org/get?query=1',
})(WithHttpGetPage);
