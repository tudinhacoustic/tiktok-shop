[![Tiktok-shop Logo](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWnWWI1yW_T2VRAYVgkByltWqH41X-Qfslgr2qHM3j64VVksDjz9CxzwbQ8M1vYlaB7QIN5pg0BUcxGP05kIcfXSNusvmeCkxVIQYkYyC12bHwuW__r9krtMPXN8yPhaXrcapdhDD70RE5vzjLb26D3d60STB5GFypF3OsNTnYhIrAtowx7eC54qJsrKGk/s1600/Untitled-2.png)](https://github.com/tudinhacoustic/tiktok-shop)

  Generate "signature" and "token" for [Tiktok Shop](https://partner.tiktokshop.com/doc).

  [![NPM Version][npm-version-image]][npm-url]
  
  I am very happy and grateful for everyone's help. These meaningful contributions will greatly help me in expanding the useful library to help people.

  <a href="https://www.buymeacoffee.com/tudinhacoustic" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

  Paypal: https://paypal.me/tudinhacoustic

## Content
- [Content](#content)
- [Installation](#installation)
- [Features](#features)
- [Community](#community)
- [Generate Signature using Url](#generate-signature-using-url)
- [Generate Signature using Config](#generate-signature-using-config)
- [Generate Token using Auth Code](#generate-token-using-auth-code)
- [Generate Token using Refresh Token](#generate-token-using-refresh-token)
- [Using TikTok Shop Client API](#using-tiktok-shop-client-api)

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

[Back](#content)

## Generate Signature using Url
```js
const tiktokShop = require('tiktok-shop')

// Example Url.
// The package helps reorder the parameters and remove keys as Tiktok Shop's instructions.
const url = 'https://open-api.tiktokglobalshop.com/order/202309/orders?access_token=ROW_CBxxx&app_key=6a6xxx&ids=5779xxx&shop_cipher=ROW_Y-vWxxx&shop_id=&timestamp=1697708762&version=202309';

const appSecret = '4ebxxx';

const signature = tiktokShop.signByUrl(url, appSecret);
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

## Generate Signature using Config
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

## Using TikTok Shop Client API
The TikTok Shop Client API can be easily used to interact with the TikTok API. Here is an example of how it can be used:

```javascript
const TitTokClient = require('tiktok-shop');

// Create a new client
const client = TitTokClient('yourAppKey', 'yourAppSecret', 'yourAccessToken', 'yourShopChiper', 'yourShopId');

// Now you can use the client to call the API
// For instance, here is how you can get a product:
client.getProduct('productId').then(product => {
  console.log(product);
});
```
In this example, we are creating a new TikTok client and then we use the getProduct method to get product details.

[Back](#content)


[npm-url]: https://npmjs.org/package/tiktok-shop
[npm-version-image]: https://badgen.net/npm/v/tiktok-shop

Follow me on: 
[Linkedin](https://www.linkedin.com/in/tudinhacoustic) |
[Youtube](https://www.youtube.com/c/TuDinh) |
[Facebook](https://www.facebook.com/TuThichLapTrinh)

  