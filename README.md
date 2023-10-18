[![Tiktok-shop Logo](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWnWWI1yW_T2VRAYVgkByltWqH41X-Qfslgr2qHM3j64VVksDjz9CxzwbQ8M1vYlaB7QIN5pg0BUcxGP05kIcfXSNusvmeCkxVIQYkYyC12bHwuW__r9krtMPXN8yPhaXrcapdhDD70RE5vzjLb26D3d60STB5GFypF3OsNTnYhIrAtowx7eC54qJsrKGk/s1600/Untitled-2.png)](https://github.com/tudinhacoustic/tiktok-shop)

  Generate "signature" and "token" for [Tiktok Shop](https://partner.tiktokshop.com/doc).

  [![NPM Version][npm-version-image]][npm-url]
  
  I am very happy and grateful for everyone's help. These meaningful contributions will greatly help me in expanding the useful library to help people.

  <a href="https://www.buymeacoffee.com/tudinhacoustic" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

  Paypal: https://paypal.me/tudinhacoustic

## Content
1. [Installation](#installation)
2. [Features](#features)
3. [Community](#community)
4. [Generate Signature](#generate-signature)
5. [Generate Token using Auth Code](#generate-token-using-auth-code)
6. [Generate Token using Refresh Token](#generate-token-using-refresh-token)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install tiktok-shop
```
[Back](#content)

## Features

  * Generate Signature
  * Generate Token using Auth Code
  * Generate Token using Refresh Token

[Back](#content)

## Community

  * [Discord](https://discord.com/channels/1164023414315548786/1164023415288631379) for support and discussion
  * [Github](https://github.com/tudinhacoustic/tiktok-shop/issues) for have issues

## Generate Signature
```js
const tiktokShop = require('tiktok-shop')

// Extract all query param EXCEPT ' sign ', ' access_token ', You do not need to reorder the params based on alphabetical order.
const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
    shop_id: 'yourShopId', // Optional
    shop_cipher: 'yourShopCipher', // Optional
    version: '202306', // Default: 202212
}

// Tiktok API name, more detail: https://partner.tiktokshop.com/dev/api-testing-tool
const path = '/api/orders/search';
const signature = tiktokShop.signature(config, path);
console.info(signature);
```
Response Data
```console
{
  signature: '96f15922fbacd220cea0d8370ba7dff2273674f2a2856868b7e32f7d98da0efe',
  timestamp: 1697540200
}
```
[Back](#content)
## Generate Token using Auth Code
```js
const tiktokShop = require('tiktok-shop')

// Extract all query param EXCEPT ' sign ', ' access_token ', You do not need to reorder the params based on alphabetical order.
const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
}

// How to get Auth Code: https://partner.tiktokshop.com/doc/page/63fd743c715d622a338c4e5a
const authCode = 'yourAuthCode';
const accessToken = tiktokShop.authCodeToken(config, authCode);
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
const tiktokShop = require('tiktok-shop')

// Extract all query param EXCEPT ' sign ', ' access_token ', You do not need to reorder the params based on alphabetical order.
const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
}

// How to get Auth Code: https://partner.tiktokshop.com/doc/page/63fd743c715d622a338c4e5a
const refreshToken = 'yourRefreshToken';
const accessToken = tiktokShop.authCodeToken(config, refreshToken);
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


[npm-url]: https://npmjs.org/package/tiktok-shop
[npm-version-image]: https://badgen.net/npm/v/tiktok-shop

Follow me on: 
[Linkedin](https://www.linkedin.com/in/tudinhacoustic) |
[Youtube](https://www.youtube.com/c/TuDinh) |
[Facebook](https://www.facebook.com/TuThichLapTrinh)

  