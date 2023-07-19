"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageRouter = void 0;
var cloudinary_config_1 = require("../config/cloudinary.config");
var express_1 = require("express");
var uploadImageRouter = (0, express_1.Router)();
exports.uploadImageRouter = uploadImageRouter;
uploadImageRouter.post("/uploadImage", cloudinary_config_1.uploadImg.single("image"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
    }
    var _a = req.file, filename = _a.filename, path = _a.path, size = _a.size;
    return res.json({ filename: filename, path: path, size: size });
});
