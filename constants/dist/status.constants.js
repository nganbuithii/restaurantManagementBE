"use strict";
exports.__esModule = true;
exports.isValidStatus = exports.VALID_STATUS = void 0;
exports.VALID_STATUS = ['available', 'out_of_stock', 'pending'];
function isValidStatus(status) {
    return exports.VALID_STATUS.includes(status);
}
exports.isValidStatus = isValidStatus;
