export interface TikTokShopConfig {
  /** App key (camelCase) */
  appKey?: string;
  /** App secret (camelCase) */
  appSecret?: string;
  /** App key (snake_case, for migration) */
  app_key?: string;
  /** App secret (snake_case, for migration) */
  app_secret?: string;
  /** API version, e.g. "202309" */
  version?: string;
  /** Optional fixed timestamp for signing */
  timestamp?: number;
}

/** Internal normalized config used by Common / Authorized */
export interface NormalizedConfig {
  app_key: string;
  app_secret: string;
  version?: string;
  timestamp?: number;
  [key: string]: string | number | undefined;
}

export interface SignatureResult {
  signature: string;
  timestamp: number;
}

export interface TokenResponse {
  access_token?: string;
  access_token_expire_in?: number;
  refresh_token?: string;
  refresh_token_expire_in?: number;
  open_id?: string;
  seller_name?: string;
  seller_base_region?: string;
  user_type?: number;
  [key: string]: unknown;
}

export type RequestBody = Record<string, unknown> | string;
