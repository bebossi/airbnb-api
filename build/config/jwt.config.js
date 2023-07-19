"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    var id = user.id, userName = user.userName, email = user.email, image = user.image, favoriteIds = user.favoriteIds;
    var signature = process.env.TOKEN_SIGN_SECRET;
    var expiration = "8h";
    return jsonwebtoken_1.default.sign({ id: id, userName: userName, email: email, image: image, favoriteIds: favoriteIds }, signature, {
        expiresIn: expiration,
    });
}
exports.generateToken = generateToken;
