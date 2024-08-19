"use strict";
exports.__esModule = true;
// src/config/cloudinary.config.ts
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
exports["default"] = cloudinary_1.v2;
