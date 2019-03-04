"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _request = _interopRequireDefault(require("request"));

var _error = _interopRequireDefault(require("./error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Query =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Query, _PureComponent);

  function Query(props) {
    var _this;

    _classCallCheck(this, Query);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Query).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "sendRequest", function (uri, options) {
      _this.setState({
        loading: true,
        error: null
      });

      _request.default.get(uri, options, function (error, response, body) {
        if (error) {
          var httpError = new _error.default({
            statusCode: response.statusCode,
            message: error.message,
            data: body
          });

          _this.setState({
            loading: false,
            data: null,
            error: httpError
          });

          return;
        }

        _this.setState({
          loading: false,
          data: body,
          error: null
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRetry", function (_ref) {
      var uri = _ref.uri,
          options = _ref.options;

      if (uri !== _this.state.uri || options !== _this.state.options) {
        _this.setState({
          uri: uri,
          options: options
        });
      } else {
        _this.sendRequest(_this.props.uri, _this.props.method, _this.props.options);
      }
    });

    _this.state = {
      uri: props.uri,
      method: props.method,
      loading: false,
      data: undefined,
      error: undefined
    };
    return _this;
  }

  _createClass(Query, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sendRequest(this.props.uri);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.uri !== this.state.uri || nextProps.method !== this.state.method || nextProps.options !== this.state.options) {
        // Fetch data when the changes of param uri and options detected.
        this.setState({
          uri: nextProps.uri,
          method: nextProps.method,
          options: nextProps.options
        }); // Request data in the next frame

        requestAnimationFrame(function () {
          _this2.sendRequest(nextProps.uri, nextProps.method, nextProps.options);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state = this.state,
          data = _this$state.data,
          loading = _this$state.loading,
          error = _this$state.error;
      return children({
        data: data,
        loading: loading,
        error: error,
        retry: this.onRetry
      });
    }
  }]);

  return Query;
}(_react.PureComponent);

Query.defaultProps = {
  options: {}
};
Query.propTypes = {
  uri: _propTypes.default.string.isRequired,
  method: _propTypes.default.string.isRequired,
  children: _propTypes.default.elementType({
    data: _propTypes.default.object,
    loading: _propTypes.default.bool,
    error: _propTypes.default.object,
    retry: _propTypes.default.func
  }).isRequired,
  options: _propTypes.default.object
};
var _default = Query;
exports.default = _default;