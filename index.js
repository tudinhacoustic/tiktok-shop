const axios = require('axios');
const Common = require('./common/common');
const Authorized = require('./services/authorized');
const TikTok = require('./api/api')

function TitTokClient(appKey, appSecret, accessToken, shopChiper, shopId){
    if (!appKey) {
        return new Error('appKey is required');
    }
    if (!accessToken) {
        return new Error('accessToken is required');
    }
    if (!appSecret) {
        return new Error('appSecret is required');
    }
    const client = new TikTok({appKey, accessToken, shopChiper, shopId, appSecret})
    return client
}
function signature(config, path) {
    const error = Common.checkConfig(config);
    if (error) {
        return new Error(error);
    }
    if (!path) {
        return new Error('path is required');
    }
    return Common.signature(config, path);
}
async function authCodeToken(config, authCode) {
    const error = Common.checkConfig(config);
    let result = {};
    let errorResponse = '';
    if (error) {
        return new Error(error);
    }
    if (!authCode) {
        return new Error('authCode is required');
    }
    const url = Authorized.generateTokenByAuthCodeUrl(config, authCode);
    await axios.get(url)
    .then((res) => {
        result = res.data;
    })
    .catch(err => {
        errorResponse = err.message;
    })
    if (errorResponse) { return new Error(errorResponse) };
    return result;
}
async function generateToken(config, refreshToken) {
    const error = Common.checkConfig(config);
    let result = {};
    let errorResponse = '';
    if (error) {
        return new Error(error);
    }
    if (!refreshToken) {
        return new Error('refreshToken is required');
    }
    const url = Authorized.generateTokenByRefreshToken(config, refreshToken);
    await axios.get(url)
    .then((res) => {
        if (res.data.data) {
            result = res.data.data;
        } else {
            result = res.data;
        }
    })
    .catch(err => {
        errorResponse = err.message;
    })
    if (errorResponse) { return new Error(errorResponse) };
    return result;
}
function signByUrl(url = '', appSecret = '') {
    const error = Common.checkUrl(url, appSecret);
    if (error) {
        return new Error(error);
    }
    return Common.signByUrl(url, appSecret);
}
module.exports = {
    signature,
    authCodeToken,
    generateToken,
    signByUrl,
    TitTokClient
}