"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = __importDefault(require("../constants"));
class Common {
    static timestamp() {
        const currentUnixTimeInSeconds = Math.floor(Date.now() / 1000);
        return currentUnixTimeInSeconds;
    }
    static sha256Decoded(plainText, secretKey) {
        const hmac = crypto_1.default.createHmac("sha256", secretKey);
        hmac.update(plainText);
        return hmac.digest("hex");
    }
    static signature(config = {}, path = "", body = {}) {
        let input = "";
        const getKeyValue = this.getKeyValue(config);
        let timestamp = this.timestamp();
        if (config.timestamp) {
            timestamp = config.timestamp;
        }
        let formatUrl = "";
        if (path.includes("?")) {
            formatUrl = `${path}&${getKeyValue}&timestamp=${timestamp}&version=${config.version ? config.version : constants_1.default.version}`;
        }
        else {
            formatUrl = `${path}?${getKeyValue}&timestamp=${timestamp}&version=${config.version ? config.version : constants_1.default.version}`;
        }
        const getBaseUrl = this.getBaseUrl(formatUrl);
        const stringToObject = this.stringToObject(getBaseUrl.query);
        const key = this.sortKeyObject(stringToObject);
        const tiktokPathHash = this.getPath(formatUrl);
        for (let index = 0; index < key.length; index += 1) {
            input += key[index] + stringToObject[key[index]];
        }
        const plainText = config.app_secret +
            tiktokPathHash +
            decodeURIComponent(input) +
            JSON.stringify(body) +
            config.app_secret;
        const signature = this.sha256Decoded(plainText, config.app_secret);
        return {
            signature,
            timestamp,
        };
    }
    static getBaseUrl(url = "") {
        const parts = url.split("?");
        return {
            baseUrl: parts[0] + "?",
            query: parts[1],
        };
    }
    static getPath(url = "") {
        const indexOfDotCom = url.indexOf(".com");
        const indexOfQuestionMark = url.indexOf("?", indexOfDotCom);
        return url.substring(indexOfDotCom, indexOfQuestionMark);
    }
    static sortKeyObject(pathObj = {}) {
        const declareKeyObj = ["app_secret", "token", "access_token", "sign"];
        const keys = Object.keys(pathObj).filter((k) => !declareKeyObj.includes(k));
        return keys.sort((a, b) => a.localeCompare(b));
    }
    static stringToObject(string = "") {
        const keyValuePairs = string.split("&");
        const result = {};
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split("=");
            result[key] = value;
        });
        return result;
    }
    static getKeyValue(obj = {}) {
        let result = "";
        let index = 1;
        const count = Object.keys(obj).length;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (index === count) {
                    result += `${key}=${obj[key]}`;
                    index++;
                }
                else {
                    result += `${key}=${obj[key]}&`;
                    index++;
                }
            }
        }
        return result;
    }
    static checkConfig(config) {
        let error = "";
        if (!(config.app_key && config.app_secret)) {
            const compareArray = ["app_key", "app_secret"];
            const keysArray = Object.keys(config);
            const missing = compareArray.filter((item) => !keysArray.includes(item));
            error = `config must have ${missing.toString()}`;
        }
        return error;
    }
    static signatureByAppSecret(params = {}, path = "", appSecret = "") {
        let input = "";
        let timestamp = this.timestamp();
        if (params.timestamp) {
            timestamp = params.timestamp;
        }
        const modParams = Object.assign(Object.assign({}, params), { timestamp });
        const key = this.sortKeyObject(modParams);
        for (let index = 0; index < key.length; index += 1) {
            input += key[index] + modParams[key[index]];
        }
        const plainText = appSecret + path + input + appSecret;
        const signature = this.sha256Decoded(plainText, appSecret);
        return {
            signature: signature,
            timestamp,
        };
    }
    static signByUrl(url = "", appSecret = "") {
        const { path, query } = this.getPathQueryFromUrl(decodeURIComponent(url));
        const params = this.parseQueryString(query);
        return this.signatureByAppSecret(params, path, appSecret);
    }
    static getPathQueryFromUrl(url = "") {
        const parts = url.split("?");
        const match = url.match(/\.com(.*?)\?/);
        if (match === null) {
            throw new Error("URL does not match the expected pattern");
        }
        return {
            path: match[1],
            query: parts[1],
        };
    }
    static parseQueryString(queryString) {
        const obj = {};
        queryString.split("&").forEach((keyValue) => {
            const [key, value] = keyValue.split("=");
            obj[key] = value;
        });
        return obj;
    }
    static checkUrl(url, appSecret) {
        let error = "";
        if (!url) {
            error = `url is required`;
        }
        if (!appSecret) {
            error = `appSecret is required`;
        }
        return error;
    }
}
exports.default = Common;
