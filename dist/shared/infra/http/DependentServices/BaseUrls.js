"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseUrl = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BaseUrl = _axios.default.create({
  baseURL: 'https://5f71da6964a3720016e60ff8.mockapi.io/v1'
});

exports.BaseUrl = BaseUrl;