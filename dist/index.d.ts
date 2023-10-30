import TikTok from './api/api';
interface Config {
    appKey: string;
    appSecret: string;
    accessToken: string;
    shopChiper: string;
    shopId: string;
}
declare function TitTokClient({ appKey, appSecret, accessToken, shopChiper, shopId }: Config): TikTok;
declare function signature(config: Config, path: string): {
    signature: string;
    timestamp: number;
};
declare function authCodeToken(config: Config, authCode: string): Promise<any>;
declare function generateToken(config: Config, refreshToken: string): Promise<any>;
declare function signByUrl(url?: string, appSecret?: string): {
    signature: string;
    timestamp: number;
};
export { signature, authCodeToken, generateToken, signByUrl, TitTokClient };
