
import axios from 'axios';
import Common from './common/common';
import {Authorized} from './services/authorized';
import TikTok from './api/api';

interface Config {
    appKey: string;
    appSecret: string;
    accessToken: string;
    shopChiper: string;
    shopId: string;
}

function TitTokClient({appKey, appSecret, accessToken, shopChiper, shopId}: Config){
    if (!appKey) {
        throw new Error('appKey is required');
    }
    if (!accessToken) {
        throw new Error('accessToken is required');
    }
    if (!appSecret) {
        throw new Error('appSecret is required');
    }
    return new TikTok({appKey, accessToken, shopChiper, shopId, appSecret});
}

function signature(config: Config, path: string) {
    const error = Common.checkConfig(config);
    if (error) {
        throw new Error(error);
    }
    if (!path) {
        throw new Error('path is required');
    }
    return Common.signature(config, path);
}

async function authCodeToken(config: Config, authCode: string) {
    const error = Common.checkConfig(config);
    if (error) {
        throw new Error(error);
    }
    if (!authCode) {
        throw new Error('authCode is required');
    }
    const authConfig = {app_key: config.appKey, app_secret:config.appSecret}
    const url = Authorized.generateTokenByAuthCodeUrl(authConfig, authCode);
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        throw error;
    }
}

async function generateToken(config: Config, refreshToken: string) {
    const error = Common.checkConfig(config);
    if (error) {
        throw new Error(error);
    }
    if (!refreshToken) {
        throw new Error('refreshToken is required');
    }
    const authConfig = {app_key: config.appKey, app_secret:config.appSecret}
    const url = Authorized.generateTokenByRefreshToken(authConfig, refreshToken);
    try {
        const response = await axios.get(url);
        return response.data.data ? response.data.data : response.data;
    } catch (error) {
        throw error;
    }
}

function signByUrl(url: string = '', appSecret: string = '') {
    const error = Common.checkUrl(url, appSecret);
    if (error) {
        throw new Error(error);
    }
    return Common.signByUrl(url, appSecret);
}

export {
    signature,
    authCodeToken,
    generateToken,
    signByUrl,
    TitTokClient
}
