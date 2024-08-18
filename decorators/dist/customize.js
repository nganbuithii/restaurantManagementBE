"use strict";
exports.__esModule = true;
exports.skipCheckPermission = exports.IS_PUBLIC_PERMISSION = exports.CurrentUser = exports.ResponseMessage = exports.RESPONSE_MESSAGE = exports.Public = exports.IS_PUBLIC_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
// design một decorator
exports.Public = function () { return common_1.SetMetadata(exports.IS_PUBLIC_KEY, true); };
// CẤU HÌNH DATA TRẢ RA CỦA API
exports.RESPONSE_MESSAGE = 'response_message';
exports.ResponseMessage = function (message) {
    return common_1.SetMetadata(exports.RESPONSE_MESSAGE, message);
};
exports.CurrentUser = common_1.createParamDecorator(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports.IS_PUBLIC_PERMISSION = "isPublicPermission";
exports.skipCheckPermission = function () { return common_1.SetMetadata(exports.IS_PUBLIC_PERMISSION, true); };
