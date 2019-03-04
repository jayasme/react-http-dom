import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpPost extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendPostRequest = (
            uri,
            params,
            options,
            onResponse,
            onError,
          ) => {
            const form = { form: params };
            mutate({
              uri,
              method: 'POST',
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
              method: 'POST',
              form,
              ...options,
              onResponse,
              onError,
            });
          };

          return children({
            post: sendPostRequest,
            upload: sendUploadRequest,
          });
        }}
      </Mutation>
    );
  }
}

const withHttpPost = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpPost>
      {({ sendPost, sendUpload }) => (
        <WrappedComponent sendPost={sendPost} sendUpload={sendUpload} />
      )}
    </HttpPost>
  );

  return EnhancedComponent;
};

HttpPost.propTypes = {
  children: PropTypes.elementType({
    sendPost: PropTypes.elementType({
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

export { HttpPost, withHttpPost };
