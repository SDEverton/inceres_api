"use strict";

var _tsyringe = require("tsyringe");

var _RedisCacheProvider = require("./implementations/RedisCacheProvider");

_tsyringe.container.registerSingleton('CacheProvider', _RedisCacheProvider.RedisCacheProvider);