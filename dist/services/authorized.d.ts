interface Config {
    app_key: string;
    app_secret: string;
}
export declare class Authorized {
    static generateTokenByAuthCodeUrl(config: Config, authCode: string): string;
    static generateTokenByRefreshToken(config: Config, refreshToken: string): string;
}
export {};
