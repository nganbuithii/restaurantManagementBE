"use strict";
exports.__esModule = true;
exports.storageConfig = void 0;
var multer_1 = require("multer");
// export const storageConfig = (folder: string) => diskStorage({
//     destination:`uploads/${folder}`,
//     filename: (req,file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
exports.storageConfig = function () {
    return multer_1["default"].memoryStorage();
};
