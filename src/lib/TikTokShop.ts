import axios from 'axios';
import Common from '../common/common';
import Authorized from '../services/authorized';
import type {
  NormalizedConfig,
  RequestBody,
  SignatureResult,
  TikTokShopConfig,
  TokenResponse,
} from '../types';

export default class TikTokShop {
  readonly config: NormalizedConfig;

  constructor(config: TikTokShopConfig = {}) {
    this.config = TikTokShop.normalizeConfig(config);
    const missing: string[] = [];
    if (!this.config.app_key) missing.push('appKey');
    if (!this.config.app_secret) missing.push('appSecret');
    if (missing.length) {
      throw new Error(`config must have ${missing.join(', ')}`);
    }
  }

  /**
   * Accept camelCase and snake_case; normalize to snake_case for internal APIs.
   */
  static normalizeConfig(config: TikTokShopConfig = {}): NormalizedConfig {
    const app_key = config.appKey || config.app_key || '';
    const app_secret = config.appSecret || config.app_secret || '';
    const normalized: NormalizedConfig = {
      app_key,
      app_secret,
    };
    if (config.version != null) {
      normalized.version = config.version;
    }
    if (config.timestamp != null) {
      normalized.timestamp = config.timestamp;
    }
    return normalized;
  }

  /**
   * Generate signature from a full TikTok Shop API URL.
   */
  signByUrl(url = '', body: RequestBody = {}): SignatureResult {
    const error = Common.checkUrl(url, this.config.app_secret);
    if (error) {
      throw new Error(error);
    }
    if (typeof body === 'string') {
      return Common.signByUrl(url, this.config.app_secret, JSON.parse(body) as Record<string, unknown>);
    }
    return Common.signByUrl(url, this.config.app_secret, body);
  }

  /**
   * Generate signature from path + optional query params (config-based).
   */
  sign(path: string, extraParams: Record<string, unknown> = {}): SignatureResult {
    if (!path) {
      throw new Error('path is required');
    }
    const config = { ...this.config, ...extraParams } as NormalizedConfig & Record<string, unknown>;
    return Common.signature(config, path);
  }

  /**
   * Exchange auth code for access token.
   */
  async authCodeToken(authCode: string): Promise<TokenResponse> {
    if (!authCode) {
      throw new Error('authCode is required');
    }
    const url = Authorized.generateTokenByAuthCodeUrl(this.config, authCode);
    try {
      const res = await axios.get(url);
      return res.data as TokenResponse;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    }
  }

  /**
   * Refresh access token using a refresh token.
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    if (!refreshToken) {
      throw new Error('refreshToken is required');
    }
    const url = Authorized.generateTokenByRefreshToken(this.config, refreshToken);
    try {
      const res = await axios.get(url);
      if (res.data && res.data.data) {
        return res.data.data as TokenResponse;
      }
      return res.data as TokenResponse;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    }
  }
}
