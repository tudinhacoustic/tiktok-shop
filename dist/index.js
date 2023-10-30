"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitTokClient = exports.signByUrl = exports.generateToken = exports.authCodeToken = exports.signature = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = __importDefault(require("./common/common"));
const authorized_1 = require("./services/authorized");
const api_1 = __importDefault(require("./api/api"));
function TitTokClient({ appKey, appSecret, accessToken, shopChiper, shopId }) {
    if (!appKey) {
        throw new Error('appKey is required');
    }
    if (!accessToken) {
        throw new Error('accessToken is required');
    }
    if (!appSecret) {
        throw new Error('appSecret is required');
    }
    return new api_1.default({ appKey, accessToken, shopChiper, shopId, appSecret });
}
exports.TitTokClient = TitTokClient;
function signature(config, path) {
    const error = common_1.default.checkConfig(config);
    if (error) {
        throw new Error(error);
    }
    if (!path) {
        throw new Error('path is required');
    }
    return common_1.default.signature(config, path);
}
exports.signature = signature;
function authCodeToken(config, authCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = common_1.default.checkConfig(config);
        if (error) {
            throw new Error(error);
        }
        if (!authCode) {
            throw new Error('authCode is required');
        }
        const authConfig = { app_key: config.appKey, app_secret: config.appSecret };
        const url = authorized_1.Authorized.generateTokenByAuthCodeUrl(authConfig, authCode);
        try {
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.authCodeToken = authCodeToken;
function generateToken(config, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = common_1.default.checkConfig(config);
        if (error) {
            throw new Error(error);
        }
        if (!refreshToken) {
            throw new Error('refreshToken is required');
        }
        const authConfig = { app_key: config.appKey, app_secret: config.appSecret };
        const url = authorized_1.Authorized.generateTokenByRefreshToken(authConfig, refreshToken);
        try {
            const response = yield axios_1.default.get(url);
            return response.data.data ? response.data.data : response.data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.generateToken = generateToken;
function signByUrl(url = '', appSecret = '') {
    const error = common_1.default.checkUrl(url, appSecret);
    if (error) {
        throw new Error(error);
    }
    return common_1.default.signByUrl(url, appSecret);
}
exports.signByUrl = signByUrl;
