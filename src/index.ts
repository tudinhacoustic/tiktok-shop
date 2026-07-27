import axios from 'axios';
import Common from './common/common';
import Authorized from './services/authorized';
import TikTokShop from './lib/TikTokShop';
import type {
  NormalizedConfig,
  RequestBody,
  SignatureResult,
  TikTokShopConfig,
  TokenResponse,
} from './types';

export type {
  NormalizedConfig,
  RequestBody,
  SignatureResult,
  TikTokShopConfig,
  TokenResponse,
};

export { TikTokShop };
export default TikTokShop;

// --- Legacy functional API (kept for backward compatibility) ---

function signature(
  config: NormalizedConfig,
  path: string
): SignatureResult | Error {
  const error = Common.checkConfig(config);
  if (error) {
    return new Error(error);
  }
  if (!path) {
    return new Error('path is required');
  }
  return Common.signature(config, path);
}

async function authCodeToken(
  config: NormalizedConfig,
  authCode: string
): Promise<TokenResponse | Error> {
  const error = Common.checkConfig(config);
  if (error) {
    return new Error(error);
  }
  if (!authCode) {
    return new Error('authCode is required');
  }
  const url = Authorized.generateTokenByAuthCodeUrl(config, authCode);
  try {
    const res = await axios.get(url);
    return res.data as TokenResponse;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Error(message);
  }
}

async function generateToken(
  config: NormalizedConfig,
  refreshToken: string
): Promise<TokenResponse | Error> {
  const error = Common.checkConfig(config);
  if (error) {
    return new Error(error);
  }
  if (!refreshToken) {
    return new Error('refreshToken is required');
  }
  const url = Authorized.generateTokenByRefreshToken(config, refreshToken);
  try {
    const res = await axios.get(url);
    if (res.data && res.data.data) {
      return res.data.data as TokenResponse;
    }
    return res.data as TokenResponse;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Error(message);
  }
}

function signByUrl(
  url = '',
  appSecret = '',
  body: RequestBody = {}
): SignatureResult | Error {
  const error = Common.checkUrl(url, appSecret);
  if (error) {
    return new Error(error);
  }
  if (typeof body === 'string') {
    return Common.signByUrl(url, appSecret, JSON.parse(body) as Record<string, unknown>);
  }
  return Common.signByUrl(url, appSecret, body);
}

export { signature, authCodeToken, generateToken, signByUrl };

// CommonJS interop: allow `const TikTokShop = require('tiktok-shop')`
// while still attaching legacy named exports.
module.exports = TikTokShop;
module.exports.default = TikTokShop;
module.exports.TikTokShop = TikTokShop;
module.exports.authCodeToken = authCodeToken;
module.exports.generateToken = generateToken;
module.exports.signByUrl = signByUrl;
module.exports.signature = signature;
