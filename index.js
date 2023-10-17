const axios = require('axios');
const Common = require('./common/common');
const Authorized = require('./services/authorized');
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
module.exports = {
    signature,
    authCodeToken,
    generateToken,
}