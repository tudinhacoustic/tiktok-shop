"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = void 0;
const constants_1 = __importDefault(require("../constants"));
class Authorized {
    static generateTokenByAuthCodeUrl(config, authCode) {
        return `${constants_1.default.generateTokenByAuthCodeUrl}?app_key=${config.app_key}&auth_code=${authCode}&app_secret=${config.app_secret}&grant_type=authorized_code`;
    }
    static generateTokenByRefreshToken(config, refreshToken) {
        return `${constants_1.default.generateTokenByRefreshTokenUrl}?app_key=${config.app_key}&app_secret=${config.app_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    }
}
exports.Authorized = Authorized;
