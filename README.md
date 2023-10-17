[![Tiktok-shop Logo](https://lh3.googleusercontent.com/pw/ADCreHe_cT5Cz7DFenWrzZUuZJeYA8ZQ5a_xBg92wD6kh1PaedpacFZeoeMWFQiADulhjMfyQapgf5JUT6UnBoIKNbut0EBaYaL-EPjCFAqJGFj8_lJK5lrsxN-z7U_bJ2fITJU9KSu_-17Tf54dM-eYwYCVQsP0hWx58YvBObFwmrPWvae7_amSUQORf7P-CLcfxkYqhcaxAMUrjabBgn1o4VJML-yr7xyo83AL4r_whBQRcaqckaBgamGygqE_tzK0HOTM4thrvW7pKrG5b4wp1q1gkm4xZft_YyU1Q4SqPYAIMlS_O0tOz3HISHCaooDSxBeNMbnzJBv-VZht17TGr5ra-YQB5yd__FgoTUSrRB_Zv_UQBE_EWggoQahsfNnAAu8WmhJMiiMKqYXfeP82O8pzB3kEboDgIpdx6WECBdqd2WGZEoohF4NFKtco4TbBzkd1p0WX6Nr1HIjMwItgi-ryghqiDbSwd5XK1fDl2tohZavfNTSZvjgrY5J74jpPe-2gSfoibgFhTd6qw5La8vj3o_PJqHeELbuT8_tLP-6hzJCFzs5keJ7gBJLhCmao3MLchexR43r9BUJHyAX-5lQF8oXsnbZ_JXSP-m13h8aUkTfhjTaclOqacTrfn0cIJTEdTwiy4iAvxz-QSydyr1nDtdxhAVv-KwbkFM8KYi5r64WocslhsaP15Y50TvA3nX2Jdl5sIcW6Z9nccF2aIANwHtt-rL3EtMws84d0rJpKX_Rex_MRbXLJA2MRmV-6qLRp8hRty_B9sqV5NdBRpYE6XQzjyBa9mm35Qm3pKXnkM7DHjLgRZoBMuYk4DopQEDx7xydJFw4pJCpE5wICcOg4VbCS5BxoaDaJKsBqGyoFx7dUoF2SdQgEVc53gi_x6cAI_mLsRX33lLRnhYcjDQ=w465-h141-s-no-gm?authuser=0)](https://github.com/tudinhacoustic/tiktok-shop)

  Generate "signature" and "token" for [Tiktok Shop](https://partner.tiktokshop.com/doc).

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

## Content
1. [Installation](#installation)
2. [Features](#features)
2. [Generate Signature](#generate-signature)
2. [Generate Token using Auth Code](#generate-token-using-auth-code)
2. [Generate Token using Refresh Token](#generate-token-using-refresh-token)

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
## Generate Signature
```js
const tiktokShop = require('tiktok-shop')

const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
    shop_id: 'yourShopId', // Optional
    shop_cipher: 'yourShopCipher', // Optional
}

// Tiktok API name, more detail: https://partner.tiktokshop.com/dev/api-testing-tool
const url = '/api/orders/search';
const signature = tiktokShop.signature(config, url);
console.info(signature);
```
Data Reponse
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

const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
    shop_id: 'yourShopId', // Optional
    shop_cipher: 'yourShopCipher', // Optional
}

// How to get Auth Code: https://partner.tiktokshop.com/doc/page/63fd743c715d622a338c4e5a
const authCode = 'yourAuthCode';
const accessToken = tiktokShop.authCodeToken(config, authCode);
console.info(accessToken);
```
Data Reponse
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

const config = {
    app_key: 'yourAppKey', // Required
    app_secret: 'yourAppSecret',  // Required
    shop_id: 'yourShopId', // Optional
    shop_cipher: 'yourShopCipher', // Optional
}

// How to get Auth Code: https://partner.tiktokshop.com/doc/page/63fd743c715d622a338c4e5a
const refreshToken = 'yourRefreshToken';
const accessToken = tiktokShop.authCodeToken(config, refreshToken);
console.info(accessToken);
```
Data Reponse
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

Follow me on: 
[Linkedin](https://www.linkedin.com/in/tudinhacoustic) |
[Youtube](https://www.youtube.com/c/TuDinh) |
[Facebook](https://www.facebook.com/TuThichLapTrinh)

  