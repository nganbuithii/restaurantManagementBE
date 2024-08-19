"use strict";
exports.__esModule = true;
exports.storageConfig = void 0;
var multer_1 = require("multer");
exports.storageConfig = function (folder) { return multer_1.diskStorage({
    destination: "uploads/" + folder,
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
}); };
