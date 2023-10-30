export default class Common {
    static timestamp(): number;
    static sha256Decoded(plainText: string, secretKey: string): string;
    static signature(config?: any, path?: string, body?: any): {
        signature: string;
        timestamp: number;
    };
    static getBaseUrl(url?: string): {
        baseUrl: string;
        query: string;
    };
    static getPath(url?: string): string;
    static sortKeyObject(pathObj?: any): string[];
    static stringToObject(string?: string): {
        [key: string]: string;
    };
    static getKeyValue(obj?: any): string;
    static checkConfig(config: any): string;
    static signatureByAppSecret(params?: any, path?: string, appSecret?: string): {
        signature: string;
        timestamp: number;
    };
    static signByUrl(url?: string, appSecret?: string): {
        signature: string;
        timestamp: number;
    };
    static getPathQueryFromUrl(url?: string): {
        path: string;
        query: string;
    };
    static parseQueryString(queryString: string): {
        [key: string]: string;
    };
    static checkUrl(url: string, appSecret: string): string;
}
