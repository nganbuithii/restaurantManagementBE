"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionGuard = void 0;
// permissions.guard.ts
var common_1 = require("@nestjs/common");
var PermissionGuard = /** @class */ (function () {
    function PermissionGuard(reflector) {
        this.reflector = reflector;
    }
    PermissionGuard.prototype.canActivate = function (context) {
        var requiredPermissions = this.reflector.get('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true;
        }
        var request = context.switchToHttp().getRequest();
        var user = request.user;
        // Kiểm tra xem user và permissions có tồn tại không
        if (!user || !user.permissions) {
            console.log('User or permissions not found:', user);
            return false;
        }
        return this.matchPermissions(requiredPermissions, user.permissions);
    };
    PermissionGuard.prototype.matchPermissions = function (requiredPermissions, userPermissions) {
        return requiredPermissions.every(function (permission) { return userPermissions.includes(permission); });
    };
    PermissionGuard = __decorate([
        common_1.Injectable()
    ], PermissionGuard);
    return PermissionGuard;
}());
exports.PermissionGuard = PermissionGuard;
