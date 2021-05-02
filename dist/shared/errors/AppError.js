"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

class AppError {
  constructor(message, statusCode = 400, code) {
    this.message = void 0;
    this.statusCode = void 0;
    this.code = void 0;
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }

}

exports.AppError = AppError;