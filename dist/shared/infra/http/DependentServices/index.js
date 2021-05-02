"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DependentServices = void 0;

var _BaseUrls = require("./BaseUrls");

class DependentServices {
  async execute({
    method,
    timeout,
    token,
    url,
    data,
    retry = 1
  }) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < retry; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await (0, _BaseUrls.BaseUrl)({
          method,
          timeout,
          headers: {
            Authorization: token
          },
          url,
          data
        });

        if (response) {
          return response;
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    return null;
  }

}

exports.DependentServices = DependentServices;