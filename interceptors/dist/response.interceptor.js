"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseInterceptor = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("decorators/customize");
var operators_1 = require("rxjs/operators");
var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor(reflector) {
        this.reflector = reflector;
    }
    ResponseInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        return next.handle().pipe(operators_1.map(function (data) {
            var message = _this.reflector.get(customize_1.RESPONSE_MESSAGE, context.getHandler());
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: message || 'Success',
                data: data
            };
        }));
    };
    ResponseInterceptor = __decorate([
        common_1.Injectable()
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());
exports.ResponseInterceptor = ResponseInterceptor;
