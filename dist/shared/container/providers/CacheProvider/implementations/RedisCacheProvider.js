"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedisCacheProvider = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis);
  }

  async save(key, value, time) {
    const timeSeconds = 60 * 60 * time;
    await this.client.set(key, value, 'EX', timeSeconds);
  }

  async recover(key) {
    const data = await this.client.get(key);
    return JSON.parse(data);
  }

  async invalidate(key) {
    await this.client.del(key);
  }

}

exports.RedisCacheProvider = RedisCacheProvider;