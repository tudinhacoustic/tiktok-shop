[![Tiktok-shop Logo](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWnWWI1yW_T2VRAYVgkByltWqH41X-Qfslgr2qHM3j64VVksDjz9CxzwbQ8M1vYlaB7QIN5pg0BUcxGP05kIcfXSNusvmeCkxVIQYkYyC12bHwuW__r9krtMPXN8yPhaXrcapdhDD70RE5vzjLb26D3d60STB5GFypF3OsNTnYhIrAtowx7eC54qJsrKGk/s1600/Untitled-2.png)](https://github.com/tudinhacoustic/tiktok-shop)

  Generate "signature" and "token" for [Tiktok Shop](https://partner.tiktokshop.com/doc).

  Ver1.3.0 Announcement:

  * Written in **TypeScript** with full type declarations.
  * **Client API**: create once with a config object, then call methods without passing secrets again.
  * Re-opened config-based `sign(path)`.
  * Legacy functions (`signByUrl`, `authCodeToken`, `generateToken`) remain available.

  [![NPM Version][npm-version-image]][npm-url]

  I am very happy and grateful for everyone's help. These meaningful contributions will greatly help me in expanding the useful library to help people.

  <a href="https://www.buymeacoffee.com/tudinhacoustic" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

  Paypal: https://paypal.me/tudinhacoustic

## Content
1. [Installation](#installation)
2. [Features](#features)
3. [Community](#community)
4. [Quick Start (Recommended)](#quick-start-recommended)
5. [Generate Signature using Url](#generate-signature-using-url)
6. [Generate Signature using Path](#generate-signature-using-path)
7. [Generate Token using Auth Code](#generate-token-using-auth-code)
8. [Generate Token using Refresh Token](#generate-token-using-refresh-token)
9. [Legacy API](#legacy-api)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install tiktok-shop
```
[Back](#content)

## Features

  * TypeScript support (types included)
  * Client API with config object (`appKey`, `appSecret`)
  * Generate Signature (URL or path)
  * Generate Token using Auth Code
  * Generate Token using Refresh Token

[Back](#content)

## Community

  * [Discord](https://discord.com/channels/1164023414315548786/1164023415288631379) for support and discussion
  * [Github](https://github.com/tudinhacoustic/tiktok-shop/issues) for have issues

[Back](#content)

## Quick Start (Recommended)

Pass config **once**, then call methods:

```js
const TikTokShop = require('tiktok-shop');

const shop = new TikTokShop({
    appKey: 'yourAppKey',       // Required
    appSecret: 'yourAppSecret', // Required
    // version: '202309',       // Optional
});

// Sign a request URL
const { signature, timestamp } = shop.signByUrl(url, body);

// Or sign by path + params
const signed = shop.sign('/order/202309/orders', { shop_cipher: 'ROW_xxx' });

// Tokens
const token = await shop.authCodeToken(authCode);
const refreshed = await shop.refreshToken(refreshToken);
```

TypeScript:

```ts
import TikTokShop, { TikTokShopConfig } from 'tiktok-shop';

const config: TikTokShopConfig = {
    appKey: 'yourAppKey',
    appSecret: 'yourAppSecret',
};

const shop = new TikTokShop(config);
```

`app_key` / `app_secret` (snake_case) are also accepted for migration.

See [`src/config.example.ts`](src/config.example.ts) for a copy-paste template.

[Back](#content)

## Generate Signature using Url
```js
const TikTokShop = require('tiktok-shop');

const shop = new TikTokShop({
    appKey: 'yourAppKey',
    appSecret: 'yourAppSecret',
});

// Example Url.
// The package helps reorder the parameters and remove keys as Tiktok Shop's instructions.
const url = 'https://open-api.tiktokglobalshop.com/order/202309/orders?access_token=ROW_CBxxx&app_key=6a6xxx&ids=5779xxx&shop_cipher=ROW_Y-vWxxx&shop_id=&timestamp=1697708762&version=202309';

// You can apply both string or JSON type, for Example
const body = {"order_id":"5766XXX","shipping_service_id":"7208XXX"};

const result = shop.signByUrl(url, body);
console.info(result);
```
Response Data
```console
{
  signature: '96f15922fbacd220cea0d8370ba7dff2273674f2a2856868b7e32f7d98da0efe',
  timestamp: 1697540200
}
```
[Back](#content)

## Generate Signature using Path
```js
const TikTokShop = require('tiktok-shop');

const shop = new TikTokShop({
    appKey: 'yourAppKey',
    appSecret: 'yourAppSecret',
    version: '202309',
});

const result = shop.sign('/product/202309/products', {
    shop_cipher: 'ROW_xxx',
    page_size: 20,
});
console.info(result);
```
[Back](#content)

## Generate Token using Auth Code
```js
const TikTokShop = require('tiktok-shop');

const shop = new TikTokShop({
    appKey: 'yourAppKey',
    appSecret: 'yourAppSecret',
});

// How to get Auth Code: https://partner.tiktokshop.com/doc/page/63fd743c715d622a338c4e5a
const authCode = 'yourAuthCode';
const accessToken = await shop.authCodeToken(authCode);
console.info(accessToken);
```
Response Data
```console
{
    "access_token": "ROW_-3_uKAAAAADYdCab***",
    "access_token_expire_in": 1696992654,
    "refresh_token": "ROW_RBHCjwAAAACgH1O***",
    "refresh_token_expire_in": 4818450857,
    "open_id": "D3MazQAAAAAi5AmxAvxkSaBRs***",
    "seller_name": "Test",
    "seller_base_region": "VN",
    "user_type": 0
}
```
[Back](#content)

## Generate Token using Refresh Token
```js
const TikTokShop = require('tiktok-shop');

const shop = new TikTokShop({
    appKey: 'yourAppKey',
    appSecret: 'yourAppSecret',
});

const refreshToken = 'yourRefreshToken';
const accessToken = await shop.refreshToken(refreshToken);
console.info(accessToken);
```
Response Data
```console
{
    "access_token": "ROW_-3_uKAAAAADYdCab***",
    "access_token_expire_in": 1696992654,
    "refresh_token": "ROW_RBHCjwAAAACgH1O***",
    "refresh_token_expire_in": 4818450857,
    "open_id": "D3MazQAAAAAi5AmxAvxkSaBRs***",
    "seller_name": "Test",
    "seller_base_region": "VN",
    "user_type": 0
}
```
[Back](#content)

## Legacy API

Functional exports from v1.1.x still work:

```js
const tiktokShop = require('tiktok-shop');

tiktokShop.signByUrl(url, appSecret, body);
await tiktokShop.authCodeToken({ app_key, app_secret }, authCode);
await tiktokShop.generateToken({ app_key, app_secret }, refreshToken);
```

[Back](#content)


[npm-url]: https://npmjs.org/package/tiktok-shop
[npm-version-image]: https://badgen.net/npm/v/tiktok-shop

Follow me on:
[Linkedin](https://www.linkedin.com/in/tudinhacoustic) |
[Youtube](https://www.youtube.com/c/TuDinh) |
[Facebook](https://www.facebook.com/TuThichLapTrinh)
