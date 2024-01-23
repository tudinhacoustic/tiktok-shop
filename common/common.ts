import crypto from "crypto";
import constants from "../constants";

export default class Common {
  static timestamp(): number {
    const currentUnixTimeInSeconds = Math.floor(Date.now() / 1000);
    return currentUnixTimeInSeconds;
  }
  static sha256Decoded(plainText: string, secretKey: string): string {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(plainText);
    return hmac.digest("hex");
  }
  static signature(config: any = {}, path: string = "", body: any = {}) {
    let input = "";
    const getKeyValue = this.getKeyValue(config);
    let timestamp = this.timestamp();
    if (config.timestamp) {
      timestamp = config.timestamp;
    }
    let formatUrl = "";
    if (path.includes("?")) {
      formatUrl = `${path}&${getKeyValue}&timestamp=${timestamp}&version=${
        config.version ? config.version : constants.version
      }`;
    } else {
      formatUrl = `${path}?${getKeyValue}&timestamp=${timestamp}&version=${
        config.version ? config.version : constants.version
      }`;
    }
    const getBaseUrl = this.getBaseUrl(formatUrl);
    const stringToObject = this.stringToObject(getBaseUrl.query);
    const key = this.sortKeyObject(stringToObject);
    const tiktokPathHash = this.getPath(formatUrl);
    for (let index = 0; index < key.length; index += 1) {
      input += key[index] + stringToObject[key[index]];
    }
    const plainText =
      config.app_secret +
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
  static getBaseUrl(url: string = "") {
    const parts = url.split("?");
    return {
      baseUrl: parts[0] + "?",
      query: parts[1],
    };
  }
  static getPath(url: string = "") {
    const indexOfDotCom = url.indexOf(".com");
    const indexOfQuestionMark = url.indexOf("?", indexOfDotCom);
    return url.substring(indexOfDotCom, indexOfQuestionMark);
  }
  static sortKeyObject(pathObj: any = {}) {
    const declareKeyObj = ["app_secret", "token", "access_token", "sign"];
    const keys = Object.keys(pathObj).filter((k) => !declareKeyObj.includes(k));
    return keys.sort((a, b) => a.localeCompare(b));
  }
  static stringToObject(string: string = "") {
    const keyValuePairs = string.split("&");
    const result: { [key: string]: string } = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      result[key] = value;
    });
    return result;
  }
  static getKeyValue(obj: any = {}) {
    let result = "";
    let index = 1;
    const count = Object.keys(obj).length;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (index === count) {
          result += `${key}=${obj[key]}`;
          index++;
        } else {
          result += `${key}=${obj[key]}&`;
          index++;
        }
      }
    }
    return result;
  }
  static checkConfig(config: any) {
    let error = "";
    if (!(config.app_key && config.app_secret)) {
      const compareArray = ["app_key", "app_secret"];
      const keysArray = Object.keys(config);
      const missing = compareArray.filter((item) => !keysArray.includes(item));
      error = `config must have ${missing.toString()}`;
    }
    return error;
  }
  static signatureByAppSecret(
    params: any = {},
    path: string = "",
    appSecret: string = ""
  ) {
    let input = "";
    let timestamp = this.timestamp();
    if (params.timestamp) {
      timestamp = params.timestamp;
    }
    const modParams = { ...params, timestamp };
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
  static signByUrl(url: string = "", appSecret: string = "") {
    const { path, query } = this.getPathQueryFromUrl(decodeURIComponent(url));
    const params = this.parseQueryString(query);
    return this.signatureByAppSecret(params, path, appSecret);
  }
  static getPathQueryFromUrl(url: string = "") {
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
  static parseQueryString(queryString: string) {
    const obj: { [key: string]: string } = {};
    queryString.split("&").forEach((keyValue) => {
      const [key, value] = keyValue.split("=");
      obj[key] = value;
    });
    return obj;
    
  }
  static checkUrl(url: string, appSecret: string) {
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
