import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpPut extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendPutRequest = (
            uri,
            params,
            options,
            onResponse,
            onError,
          ) => {
            const form = { form: params };
            mutate({
              uri,
              method: 'PUT',
              form,
              ...options,
              onResponse,
              onError,
            });
          };

          const sendUploadRequest = (
            uri,
            params,
            options,
            onResponse,
            onError,
          ) => {
            const form = { form: params };
            mutate({
              uri,
              method: 'PUT',
              form,
              ...options,
              onResponse,
              onError,
            });
          };

          return children({
            post: sendPutRequest,
            upload: sendUploadRequest,
          });
        }}
      </Mutation>
    );
  }
}

const withHttpPut = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpPut>
      {({ post, upload }) => <WrappedComponent post={post} upload={upload} />}
    </HttpPut>
  );

  return EnhancedComponent;
};

HttpPut.propTypes = {
  children: PropTypes.elementType({
    sendPut: PropTypes.elementType({
      uri: PropTypes.string,
      params: PropTypes.object,
      options: PropTypes.object,
      onResponse: PropTypes.func,
      onError: PropTypes.func,
    }),
    sendUpload: PropTypes.elementType({
      uri: PropTypes.string,
      params: PropTypes.object,
      options: PropTypes.object,
      onResponse: PropTypes.func,
      onError: PropTypes.func,
    }),
  }).isRequired,
};

export { HttpPut, withHttpPut };
