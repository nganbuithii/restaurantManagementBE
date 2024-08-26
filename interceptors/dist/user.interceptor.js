"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserInterceptor = void 0;
// user.interceptor.ts
var common_1 = require("@nestjs/common");
var UserInterceptor = /** @class */ (function () {
    function UserInterceptor() {
    }
    UserInterceptor.prototype.intercept = function (context, next) {
        var request = context.switchToHttp().getRequest();
        var user = request.user;
        if (user && user.role && user.role.permissions) {
            request.user = __assign(__assign({}, user), { role: __assign(__assign({}, user.role), { permissions: user.role.permissions.map(function (p) { return (__assign(__assign({}, p), { fullPermission: p.action + "_" + p.resource })); }) }) });
        }
        return next.handle();
    };
    UserInterceptor = __decorate([
        common_1.Injectable()
    ], UserInterceptor);
    return UserInterceptor;
}());
exports.UserInterceptor = UserInterceptor;
