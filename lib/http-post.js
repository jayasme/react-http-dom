"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withHttpPost = exports.HttpPost = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mutation = _interopRequireDefault(require("./base/mutation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HttpPost =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(HttpPost, _PureComponent);

  function HttpPost() {
    _classCallCheck(this, HttpPost);

    return _possibleConstructorReturn(this, _getPrototypeOf(HttpPost).apply(this, arguments));
  }

  _createClass(HttpPost, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_mutation.default, null, function (_ref) {
        var mutate = _ref.mutate;

        var sendPostRequest = function sendPostRequest(uri, params, options, onResponse, onError) {
          var form = {
            form: params
          };
          mutate(_objectSpread({
            uri: uri,
            method: 'POST',
            form: form
          }, options, {
            onResponse: onResponse,
            onError: onError
          }));
        };

        var sendUploadRequest = function sendUploadRequest(uri, params, options, onResponse, onError) {
          var form = {
            form: params
          };
          mutate(_objectSpread({
            uri: uri,
            method: 'POST',
            form: form
          }, options, {
            onResponse: onResponse,
            onError: onError
          }));
        };

        return children({
          post: sendPostRequest,
          upload: sendUploadRequest
        });
      });
    }
  }]);

  return HttpPost;
}(_react.PureComponent);

exports.HttpPost = HttpPost;

var withHttpPost = function withHttpPost() {
  return function (WrappedComponent) {
    var EnhancedComponent = function EnhancedComponent() {
      return _react.default.createElement(HttpPost, null, function (_ref2) {
        var sendPost = _ref2.sendPost,
            sendUpload = _ref2.sendUpload;
        return _react.default.createElement(WrappedComponent, {
          sendPost: sendPost,
          sendUpload: sendUpload
        });
      });
    };

    return EnhancedComponent;
  };
};

exports.withHttpPost = withHttpPost;
HttpPost.propTypes = {
  children: _propTypes.default.elementType({
    sendPost: _propTypes.default.elementType({
      uri: _propTypes.default.string,
      params: _propTypes.default.object,
      options: _propTypes.default.object,
      onResponse: _propTypes.default.func,
      onError: _propTypes.default.func
    }),
    sendUpload: _propTypes.default.elementType({
      uri: _propTypes.default.string,
      params: _propTypes.default.object,
      options: _propTypes.default.object,
      onResponse: _propTypes.default.func,
      onError: _propTypes.default.func
    })
  }).isRequired
};