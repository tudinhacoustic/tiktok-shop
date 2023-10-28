const BASE_URL = 'https://open-api.tiktokglobalshop.com/';
const VERSION = '202309';
const LOCALE = 'en-US';
const Common = require('../common/common')
const axios = require('axios');
const {
	productSchema,
	recommendationSchema,
	productPricesSchema,
	productPartailEditSchema,
	skuInventorySchema,
	productIdsSchema,
} = require('./schemas');

module.exports = class TikTok {
	constructor({appKey, accessToken, shopChiper, shopId, appSecret}) {
		this.appKey = appKey;
		this.accessToken = accessToken;
		this.shopChiper = shopChiper;
		this.shopId = shopId;
		this.appSecret = appSecret;
	}
	//TODO SHOP CHIPER not for all the calls
	#generateRequestSign(method, endpoint, bodyData = {}) {
		const accessToken = this.accessToken;
		const appKey = this.appKey;
		const shopChiper = this.shopChiper;
		const shopId = this.shopId;
		const appSecret = this.appSecret;
	
		const requestObject = {
			access_token: accessToken,
			app_key: appKey,
            app_secret: appSecret,
            shop_chiper: shopChiper !== undefined ? shopChiper : '',
			shop_id: shopId !== undefined ? shopId : '',
			version: VERSION,
		};
	
		const requestConfig = {
			method: method,
			url: `${BASE_URL}${endpoint}`,
			body: bodyData,
			params: requestObject,
			headers: {
				'x-tts-access-token': accessToken,
			},
		};
	
		const {signature, timestamp} = Common.signature(requestObject, endpoint, bodyData)

		requestConfig.params.sign = signature;
        requestConfig.params.timestamp = timestamp

		requestConfig.params = Object.keys(requestConfig.params).sort().reduce((result, key) => {
			result[key] = requestConfig.params[key];
			return result;
		}, {});
		return requestConfig;
	}

	async getProduct(id) {
		const requestConfig = this.#generateRequestSign('get', `${VERSION}/products/${id}`);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async searchInventory(bodyData = {}) {
		const requestConfig = this.#generateRequestSign('post', `${VERSION}/inventory/search`, bodyData);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async addProduct(productData) {
		const {error} = productSchema.validate(productData);
		if (error) {
			throw new Error(`Invalid product data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `${VERSION}/products`, productData);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getShops() {
		const requestConfig = this.#generateRequestSign('get', `authorization/${VERSION}/shops`);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			//
			throw error;
		}
	}

	async getSellerShops() {
		const requestConfig = this.#generateRequestSign('get', `seller/${VERSION}/shops`);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async recommendCategory(data = {}) {
		const {error} = recommendationSchema.validate(data);
		if (error) {
			throw new Error(`Invalid data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `product/${VERSION}/categories/recommend`, data);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async updateProduct(id, productData) {
		const {error} = productSchema.validate(productData);
		if (error) {
			throw new Error(`Invalid product data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('put', `product/${VERSION}/products/${id}`, productData);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getWarehouses() {
		const requestConfig = this.#generateRequestSign('get', `logistics/${VERSION}/warehouses`);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async updateProductPrices(id, skus) {
		const productPricesData = {skus};
		const {error} = productPricesSchema.validate(productPricesData);
		if (error) {
			throw new Error(`Invalid SKU data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign(
			'post',
			`product/${VERSION}/products/${id}/prices/update`,
			productPricesData
		);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async partiallyEditProduct(id, productData) {
		const {error} = productPartailEditSchema.validate(productData);
		if (error) {
			throw new Error(`Invalid product data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign(
			'post',
			`product/${VERSION}/products/${id}/partial_edit`,
			productData
		);

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getCategoryAttributes(id) {
		const requestConfig = this.#generateRequestSign('get', `product/${VERSION}/categories/${id}/attributes`, {
			locale: LOCALE,
		});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async updateProductInventory(id, skus) {
		const {error} = skuInventorySchema.validate(skus);
		if (error) {
			throw new Error(`Invalid SKU data: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `product/${VERSION}/products/${id}/inventory/update`, {
			skus,
		});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async activateProducts(productIds) {
		const {error} = productIdsSchema.validate(productIds);
		if (error) {
			throw new Error(`Invalid product ids: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `product/${VERSION}/products/activate`, {
			product_ids: productIds,
		});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async deactivateProducts(productIds) {
		const {error} = productIdsSchema.validate(productIds);
		if (error) {
			throw new Error(`Invalid product ids: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `product/${VERSION}/products/deactivate`, {
			product_ids: productIds,
		});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async deleteProducts(productIds) {
		const {error} = productIdsSchema.validate(productIds);
		if (error) {
			throw new Error(`Invalid product ids: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('delete', `product/${VERSION}/products`, {product_ids: productIds});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async recoverProducts(productIds) {
		const {error} = productIdsSchema.validate(productIds);
		if (error) {
			throw new Error(`Invalid product ids: ${error.details[0].message}`);
		}

		const requestConfig = this.#generateRequestSign('post', `product/${VERSION}/products/recover`, {
			product_ids: productIds,
		});

		try {
			const response = await axios(requestConfig);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	//add image?
};
