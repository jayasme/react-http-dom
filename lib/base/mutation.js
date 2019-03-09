"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _request = _interopRequireDefault(require("request"));

var _error = _interopRequireDefault(require("./error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mutation = function Mutation(_ref) {
  var children = _ref.children;

  var sendRequest = function sendRequest(uri, method) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var onResponse = arguments.length > 3 ? arguments[3] : undefined;
    var onError = arguments.length > 4 ? arguments[4] : undefined;

    if (!uri) {
      throw new _error.default(undefined, "Param 'uri' must not be empty.", null);
    }

    (0, _request.default)(_objectSpread({}, options, {
      uri: uri,
      method: method
    }), function (error, response, body) {
      if (error) {
        // error
        var httpError = new _error.default({
          statusCode: response ? response.statusCode : undefined,
          message: error.message,
          data: body
        });
        onError(httpError);
        return;
      }

      onResponse(body);
    });
  };

  return children({
    mutate: function mutate(_ref2) {
      var uri = _ref2.uri,
          method = _ref2.method,
          options = _ref2.options,
          onResponse = _ref2.onResponse,
          onError = _ref2.onError;
      return sendRequest(uri, method, options, onResponse, onError);
    }
  });
};

Mutation.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired
};
var _default = Mutation;
exports.default = _default;