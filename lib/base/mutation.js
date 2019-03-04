"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _request = _interopRequireDefault(require("request"));

var _error = _interopRequireDefault(require("./error"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mutation = function Mutation() {
  var sendRequest = function sendRequest(uri, method) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var onResponse = arguments.length > 3 ? arguments[3] : undefined;
    var onError = arguments.length > 4 ? arguments[4] : undefined;

    if (!uri) {
      throw new _error.default(undefined, "Param 'uri' must not be empty.", null);
    }

    (0, _request.default)(_objectSpread({
      uri: uri,
      method: method
    }, options), function (error, response, body) {
      if (error) {
        // error
        var httpError = new _error.default({
          statusCode: response.statusCode,
          message: error.message,
          data: body
        });
        onError(httpError);
        return;
      }

      onResponse(body);
    });
  };

  var children = _this.props.children;
  return children({
    mutate: function mutate(_ref) {
      var uri = _ref.uri,
          method = _ref.method,
          options = _ref.options,
          onResponse = _ref.onResponse,
          onError = _ref.onError;
      return sendRequest(uri, method, options, onResponse, onError);
    }
  });
};

Mutation.propTypes = {
  children: _propTypes.default.elementType({
    mutate: _propTypes.default.elementType({
      uri: _propTypes.default.string,
      options: _propTypes.default.object,
      onResponse: _propTypes.default.func,
      onError: _propTypes.default.func
    })
  }).isRequired
};
var _default = Mutation;
exports.default = _default;