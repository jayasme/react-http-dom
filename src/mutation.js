import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import request from 'request';

import HttpError from './error';

class Mutation extends PureComponent {
  sendRequest = (uri, method, options, onResponse, onError) => {
    if (!uri) {
      throw new HttpError(undefined, "Param 'uri' must not be empty.", null);
    }

    request({ uri, method, ...options }, (error, response, body) => {
      if (error) {
        // error
        const httpError = new HttpError({
          statusCode: response.statusCode,
          message: error.message,
          data: body,
        });
        onError(httpError);
        return;
      }

      onResponse(body);
    });
  };

  render() {
    const { children } = this.props;
    return children({
      mutate: ({ uri, method, options, onResponse, onError }) =>
        this.sendRequest(uri, method, options, onResponse, onError),
    });
  }
}

Mutation.propTypes = {
  children: PropTypes.elementType({
    mutate: PropTypes.elementType({
      uri: PropTypes.string,
      options: PropTypes.object,
      onResponse: PropTypes.func,
      onError: PropTypes.func,
    }),
  }).isRequired,
};

export default Mutation;
