
import constants from '../constants';

interface Config {
    app_key: string;
    app_secret: string;
}

export class Authorized {
    static generateTokenByAuthCodeUrl(config: Config, authCode: string): string {
        return `${constants.generateTokenByAuthCodeUrl}?app_key=${config.app_key}&auth_code=${authCode}&app_secret=${config.app_secret}&grant_type=authorized_code`;
    }
    static generateTokenByRefreshToken(config: Config, refreshToken: string): string {
        return `${constants.generateTokenByRefreshTokenUrl}?app_key=${config.app_key}&app_secret=${config.app_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    }
}
