"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.VouchersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var VouchersController = /** @class */ (function () {
    function VouchersController(vouchersService) {
        this.vouchersService = vouchersService;
    }
    VouchersController.prototype.createVoucher = function (body, user) {
        return this.vouchersService.create(body, user);
    };
    VouchersController.prototype.getAll = function (params) {
        return this.vouchersService.getAll(params);
        // @Get(':id')
        // @UseGuards(JwtAuthGuard)
        // @ResponseMessage("Get voucher details")
        // getById(@Param('id', ParseIntPipe) id: number): Promise<Voucher> {
        //   return this.vouchersService.getById(id);
        // }
        // @Patch(':id')
        // @UseGuards(JwtAuthGuard)
        // @ResponseMessage("Update voucher by id")
        // update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateVoucherDto): Promise<Voucher> {
        //   return this.vouchersService.update(id, data);
        // }
        // @Delete(':id')
        // @UseGuards(JwtAuthGuard)
        // @HttpCode(HttpStatus.NO_CONTENT)
        // @ResponseMessage("Delete voucher by id")
        // delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        //   return this.vouchersService.delete(id);
        // }
        // @Get('customers/:customerId/vouchers')
        // @UseGuards(JwtAuthGuard)
        // @ResponseMessage("Get customer's vouchers")
        // getCustomerVouchers(@Param('customerId', ParseIntPipe) customerId: number): Promise<Voucher[]> {
        //   return this.vouchersService.getCustomerVouchers(customerId);
        // }
        // @Post('orders/:orderId/apply-voucher')
        // @UseGuards(JwtAuthGuard)
        // @ResponseMessage("Apply voucher to order")
        // applyVoucher(@Param('orderId', ParseIntPipe) orderId: number, @Body() voucherCode: string): Promise<Order> {
        //   return this.vouchersService.applyVoucher(orderId, voucherCode);
        // }
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new voucher successfully"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], VouchersController.prototype, "createVoucher");
    __decorate([
        common_1.Get(),
        customize_1.ResponseMessage("Get vouchers list"),
        __param(0, common_1.Query())
    ], VouchersController.prototype, "getAll");
    VouchersController = __decorate([
        common_1.Controller('vouchers')
    ], VouchersController);
    return VouchersController;
}());
exports.VouchersController = VouchersController;
