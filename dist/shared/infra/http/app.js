"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

require("../../container");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _AppError = require("../../errors/AppError");

require("../typeorm");

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// createConnection();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use((0, _cors.default)());
app.use(_routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code
      }
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});