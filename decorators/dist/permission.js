"use strict";
exports.__esModule = true;
exports.Permissions = exports.PERMISSIONS_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.PERMISSIONS_KEY = 'permissions';
exports.Permissions = function () {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return common_1.SetMetadata(exports.PERMISSIONS_KEY, permissions);
};
