"use strict";
exports.__esModule = true;
exports.generateVoucherCode = void 0;
var crypto_1 = require("crypto");
function generateVoucherCode() {
    return crypto_1.randomBytes(4).toString('hex').toUpperCase();
}
exports.generateVoucherCode = generateVoucherCode;
