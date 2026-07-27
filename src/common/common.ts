import crypto from 'crypto';
import constants from '../constants';
import type { NormalizedConfig, SignatureResult } from '../types';

export default class Common {
  static timestamp(): number {
    return Math.floor(Date.now() / 1000) - 100;
  }

  static sha256Decoded(plainText: string, secretKey: string): string {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(plainText);
    return hmac.digest('hex');
  }

  static signature(
    config: NormalizedConfig & Record<string, unknown> = {} as NormalizedConfig,
    path = ''
  ): SignatureResult {
    let input = '';
    const getKeyValue = this.getKeyValue(config);
    let timestamp = this.timestamp();
    if (config.timestamp) {
      timestamp = Number(config.timestamp);
    }
    let formatUrl = '';
    if (path.includes('?')) {
      formatUrl = `${path}&${getKeyValue}&timestamp=${timestamp}&version=${config.version ? config.version : constants.version}`;
    } else {
      formatUrl = `${path}?${getKeyValue}&timestamp=${timestamp}&version=${config.version ? config.version : constants.version}`;
    }
    const getBaseUrl = this.getBaseUrl(formatUrl);
    const stringToObject = this.stringToObject(getBaseUrl.query);
    const key = this.sortKeyObject(stringToObject);
    const tiktokPathHash = this.getPath(formatUrl);
    for (let index = 0; index < key.length; index += 1) {
      input += key[index] + stringToObject[key[index]];
    }
    const plainText =
      config.app_secret + tiktokPathHash + decodeURIComponent(input) + config.app_secret;
    const signature = this.sha256Decoded(plainText, config.app_secret);
    return {
      signature,
      timestamp,
    };
  }

  static getBaseUrl(url = ''): { baseUrl: string; query: string } {
    const parts = url.split('?');
    return {
      baseUrl: parts[0] + '?',
      query: parts[1] || '',
    };
  }

  static getPath(url = ''): string {
    const indexOfDotCom = url.indexOf('.com');
    const indexOfQuestionMark = url.indexOf('?', indexOfDotCom);
    return url.substring(indexOfDotCom, indexOfQuestionMark);
  }

  static sortKeyObject(pathObj: Record<string, unknown> = {}): string[] {
    const declareKeyObj = ['app_secret', 'token', 'access_token', 'sign'];
    const keys = Object.keys(pathObj).filter((k) => !declareKeyObj.includes(k));
    return keys.sort((a, b) => a.localeCompare(b));
  }

  static stringToObject(string = ''): Record<string, string> {
    const keyValuePairs = string.split('&');
    const result: Record<string, string> = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) {
        result[key] = value;
      }
    });
    return result;
  }

  static getKeyValue(obj: Record<string, unknown> = {}): string {
    let result = '';
    let index = 1;
    const count = Object.keys(obj).length;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
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

  static checkConfig(config: Record<string, unknown>): string {
    let error = '';
    if (!(config.app_key && config.app_secret)) {
      const compareArray = ['app_key', 'app_secret'];
      const keysArray = Object.keys(config);
      const missing = compareArray.filter((item) => !keysArray.includes(item));
      error = `config must have ${missing.toString()}`;
    }
    return error;
  }

  static signatureByAppSecret(
    params: Record<string, unknown> = {},
    path = '',
    appSecret = '',
    body: Record<string, unknown> = {}
  ): SignatureResult {
    let input = '';
    let timestamp = this.timestamp();
    if (params.timestamp) {
      timestamp = Number(params.timestamp);
    }
    const modParams: Record<string, unknown> = { ...params, timestamp };
    const key = this.sortKeyObject(modParams);
    for (let index = 0; index < key.length; index += 1) {
      input += key[index] + String(modParams[key[index]]);
    }
    input = path + input;
    input = Object.keys(body).length > 0 ? input + JSON.stringify(body) : input;
    const plainText = appSecret + input + appSecret;
    const signature = this.sha256Decoded(plainText, appSecret);
    return {
      signature,
      timestamp,
    };
  }

  static signByUrl(
    url = '',
    appSecret = '',
    body: Record<string, unknown> = {}
  ): SignatureResult {
    const { path, query } = this.getPathQueryFromUrl(decodeURIComponent(url));
    const params = this.parseQueryString(query);
    return this.signatureByAppSecret(params, path, appSecret, body);
  }

  static getPathQueryFromUrl(url = ''): { path: string; query: string } {
    const parts = url.split('?');
    const match = url.match(/\.com(.*?)\?/);
    return {
      path: match ? match[1] : '',
      query: parts[1] || '',
    };
  }

  static parseQueryString(queryString: string): Record<string, string> {
    const obj: Record<string, string> = {};
    if (!queryString) {
      return obj;
    }
    queryString.split('&').forEach((keyValue) => {
      const [key, value] = keyValue.split('=');
      if (key) {
        obj[key] = value;
      }
    });
    return obj;
  }

  static checkUrl(url: string, appSecret: string): string {
    let error = '';
    if (!url) {
      error = 'url is required';
    }
    if (!appSecret) {
      error = 'appSecret is required';
    }
    return error;
  }
}
