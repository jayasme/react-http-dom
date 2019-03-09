import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpPost extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendPostData = ({
            uri,
            data,
            options,
            onResponse,
            onError,
          }) => {
            mutate({
              uri,
              method: 'POST',
              options: {
                ...options,
                body: data,
              },
              onResponse,
              onError,
            });
          };

          const sendPostJson = ({
            uri,
            json,
            options,
            onResponse,
            onError,
          }) => {
            mutate({
              uri,
              method: 'POST',
              options: {
                ...options,
                json,
              },
              onResponse,
              onError,
            });
          };

          const sendPostForm = ({
            uri,
            form,
            options = {},
            onResponse,
            onError,
          }) => {
            const isFormData = Object.values(form).find(
              value => typeof value === 'object',
            );

            const coptions = isFormData
              ? {
                  ...options,
                  headers: {
                    ...options.headers,
                    'content-type': 'multipart/form-data',
                    'transfer-encoding': 'chunked',
                  },
                  form,
                }
              : {
                  ...options,
                  headers: {
                    ...options.headers,
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  form,
                };

            mutate({
              uri,
              method: 'POST',
              options: coptions,
              onResponse,
              onError,
            });
          };

          return children({
            sendPostData,
            sendPostJson,
            sendPostForm,
          });
        }}
      </Mutation>
    );
  }
}

HttpPost.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const withHttpPost = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpPost>
      {({ sendPostData, sendPostJson, sendPostForm }) => (
        <WrappedComponent
          sendPostData={sendPostData}
          sendPostJson={sendPostJson}
          sendPostForm={sendPostForm}
        />
      )}
    </HttpPost>
  );

  return EnhancedComponent;
};

export { HttpPost, withHttpPost };
