import PropTypes from 'prop-types';
import request from 'request';

import HttpError from './error';

const Mutation = ({ children }) => {
  const sendRequest = (uri, method, options = {}, onResponse, onError) => {
    if (!uri) {
      throw new HttpError(undefined, "Param 'uri' must not be empty.", null);
    }

    request({ ...options, uri, method }, (error, response, body) => {
      if (error) {
        // error
        const httpError = new HttpError({
          statusCode: response ? response.statusCode : undefined,
          message: error.message,
          data: body,
        });
        onError(httpError);
        return;
      }

      onResponse(body);
    });
  };

  return children({
    mutate: ({ uri, method, options, onResponse, onError }) =>
      sendRequest(uri, method, options, onResponse, onError),
  });
};

Mutation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Mutation;
