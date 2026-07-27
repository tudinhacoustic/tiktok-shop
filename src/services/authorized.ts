import constants from '../constants';
import type { NormalizedConfig } from '../types';

export default class Authorized {
  static generateTokenByAuthCodeUrl(config: NormalizedConfig, authCode: string): string {
    return `${constants.generateTokenByAuthCodeUrl}?app_key=${config.app_key}&auth_code=${authCode}&app_secret=${config.app_secret}&grant_type=authorized_code`;
  }

  static generateTokenByRefreshToken(config: NormalizedConfig, refreshToken: string): string {
    return `${constants.generateTokenByRefreshTokenUrl}?app_key=${config.app_key}&app_secret=${config.app_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  }
}
