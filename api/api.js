const BASE_URL = "https://open-api.tiktokglobalshop.com";
const VERSION = "202309";
const LOCALE = "en-US";
const Common = require("../common/common");
const axios = require("axios");
const {
  productSchema,
  recommendationSchema,
  productPricesSchema,
  productPartailEditSchema,
  skuInventorySchema,
  productIdsSchema,
} = require("./schemas");

module.exports = class TikTok {
  constructor({ appKey, accessToken, shopChiper, shopId, appSecret }) {
    this.appKey = appKey;
    this.accessToken = accessToken;
    this.shopChiper = shopChiper;
    this.shopId = shopId;
    this.appSecret = appSecret;
  }

  #generateRequestSign(endpoint, bodyData = {}) {
    const accessToken = this.accessToken;
    const appKey = this.appKey;
    const shopChiper = this.shopChiper;
    const shopId = this.shopId;
    const appSecret = this.appSecret;

    const myUrl = `${BASE_URL}${endpoint}?access_token=${accessToken}&app_key=${appKey}&shop_chiper=${shopChiper || ''}&shop_id=${shopId || ''}&version=${VERSION}`;

    const {signature, timestamp} = Common.signByUrl(myUrl, appSecret)

    const url = `${myUrl}&timestamp=${timestamp}&sign=${signature}`;
    const headers = {
        'x-tts-access-token': accessToken,
    };

    return {url, headers, data:bodyData};
}

async getShops() {
    const {url, headers, data} = this.#generateRequestSign(
      `/authorization/${VERSION}/shops`
    );

    try {
      const response = await axios.get(url,{headers, data} );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id) {
    const {url, headers, data} = this.#generateRequestSign(
      `/${VERSION}/products/${id}`
    );

    try {
      const response = await axios.get(url, {headers, data});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

async searchInventory(bodyData = {}) {
    const {url, headers, data} = this.#generateRequestSign(
      `/${VERSION}/inventory/search`,
      bodyData
    );

    try {
      const response = await axios.post(url, data, {headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  }


async addProduct(productData) {
  const { error } = productSchema.validate(productData);
  if (error) {
    throw new Error(`Invalid product data: ${error.details[0].message}`);
  }

  const {url, headers, data} = this.#generateRequestSign(
    `/${VERSION}/products`,
    productData
  );

  try {
    const response = await axios.post(url, data, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
}


async getSellerShops() {
    const {url, headers, data} = this.#generateRequestSign(
      `/seller/${VERSION}/shops`
    );

    try {
      const response = await axios.get(url, {headers, data});
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async recommendCategory(product = {}) {
	const { error } = recommendationSchema.validate(product);
	if (error) {
	  throw new Error(`Invalid data: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/categories/recommend`,
	  product
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async updateProduct(id, productData) {
	const { error } = productSchema.validate(productData);
	if (error) {
	  throw new Error(`Invalid product data: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/${id}`,
	  productData
	);
  
	try {
	  const response = await axios.put(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async getWarehouses() {
	const {url, headers, data} = this.#generateRequestSign(
	  `/logistics/${VERSION}/warehouses`
	);
  
	try {
	  const response = await axios.get(url, {headers, data});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  

  async updateProductPrices(id, skus) {
	const productPricesData = { skus };
	const { error } = productPricesSchema.validate(productPricesData);
	if (error) {
	  throw new Error(`Invalid SKU data: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/${id}/prices/update`,
	  productPricesData
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async partiallyEditProduct(id, productData) {
	const { error } = productPartailEditSchema.validate(productData);
	if (error) {
	  throw new Error(`Invalid product data: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/${id}/partial_edit`,
	  productData
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async getCategoryAttributes(id) {
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/categories/${id}/attributes`,
	  {
		locale: LOCALE,
	  }
	);
  
	try {
	  const response = await axios.get(url, {headers, data});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async updateProductInventory(id, skus) {
	const { error } = skuInventorySchema.validate(skus);
	if (error) {
	  throw new Error(`Invalid SKU data: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/${id}/inventory/update`,
	  {
		skus,
	  }
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async activateProducts(productIds) {
	const { error } = productIdsSchema.validate(productIds);
	if (error) {
	  throw new Error(`Invalid product ids: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/activate`,
	  {
		product_ids: productIds,
	  }
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }

  async deactivateProducts(productIds) {
	const { error } = productIdsSchema.validate(productIds);
	if (error) {
	  throw new Error(`Invalid product ids: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/deactivate`,
	  {
		product_ids: productIds,
	  }
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async deleteProducts(productIds) {
	const { error } = productIdsSchema.validate(productIds);
	if (error) {
	  throw new Error(`Invalid product ids: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products`,
	  { product_ids: productIds }
	);
  
	try {
	  const response = await axios.delete(url, {headers, data});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  
  async recoverProducts(productIds) {
	const { error } = productIdsSchema.validate(productIds);
	if (error) {
	  throw new Error(`Invalid product ids: ${error.details[0].message}`);
	}
  
	const {url, headers, data} = this.#generateRequestSign(
	  `/product/${VERSION}/products/recover`,
	  {
		product_ids: productIds,
	  }
	);
  
	try {
	  const response = await axios.post(url, data, {headers});
	  return response.data;
	} catch (error) {
	  throw error;
	}
  }
  

  //add image?
};
