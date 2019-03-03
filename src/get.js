import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import request from 'request';

import HttpError from './error';

class Get extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      uri: props.uri,
      data: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.uri);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uri !== this.state.uri
      || nextProps.options !== this.state.options
    ) {
      // Fetch data when the changes of param uri and options detected.
      this.setState({
        uri: nextProps.uri,
        options: nextProps.options,
      });

      // Request data in the next frame
      requestAnimationFrame(() => {
        this.fetchData(nextProps.uri, nextProps.options);
      });
    }
  }

  sendRequest = (uri, options) => {
    this.setState({ loading: true, error: null });

    request.get(uri, options, (error, response, body) => {
      if (error) {
        const httpError = new HttpError({
          statusCode: response.statusCode,
          message: error.message,
          data: body,
        });
        this.setState({ loading: false, data: null, error: httpError });
        return;
      }

      this.setState({ loading: false, data: body, error: null });
    });
  };

  onRetry = ({ uri, options }) => {
    if (uri !== this.state.uri || options !== this.state.options) {
      this.setState({ uri, options });
    } else {
      this.fetchData(this.props.uri, this.props.options);
    }
  };

  render() {
    const { children } = this.props;
    const { data, loading, error } = this.state;
    return children({
      data,
      loading,
      error,
      retry: this.onRetry,
    });
  }
}

Get.defaultProps = {
  options: {},
};

Get.propTypes = {
  uri: PropTypes.string.isRequired,
  children: PropTypes.elementType({
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    retry: PropTypes.func,
  }).isRequired,
  options: PropTypes.object,
};

const withGet = ({ uri, options }) => (WrappedComponent) => {
  const EnhancedComponent = () => (
    <Get uri={uri} options={options}>
      {props => <WrappedComponent {...props} />}
    </Get>
  );

  return EnhancedComponent;
};

export { Get, withGet };
