const constants = require('../constants');
module.exports = class Authorized {
    static generateTokenByAuthCodeUrl(config, authCode) {
        return `${constants.generateTokenByAuthCodeUrl}?app_key=${config.app_key}&auth_code=${authCode}&app_secret=${config.app_secret}&grant_type=authorized_code`;
    }
    static generateTokenByRefreshToken(config, refreshToken) {
        return `${constants.generateTokenByRefreshTokenUrl}?app_key=${config.app_key}&app_secret=${config.app_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    }
}