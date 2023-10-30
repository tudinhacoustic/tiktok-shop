"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const common_1 = __importDefault(require("../common/common"));
const schemas_1 = require("./schemas");
const BASE_URL = "https://open-api.tiktokglobalshop.com";
const VERSION = "202309";
const LOCALE = "en-US";
class TikTok {
    constructor({ appKey, accessToken, shopChiper, shopId, appSecret, }) {
        this.appKey = appKey;
        this.accessToken = accessToken;
        this.shopChiper = shopChiper;
        this.shopId = shopId;
        this.appSecret = appSecret;
    }
    generateRequestSign(endpoint, bodyData = {}) {
        const accessToken = this.accessToken;
        const appKey = this.appKey;
        const shopChiper = this.shopChiper;
        const shopId = this.shopId;
        const appSecret = this.appSecret;
        const myUrl = `${BASE_URL}${endpoint}?access_token=${accessToken}&app_key=${appKey}&shop_chiper=${shopChiper || ""}&shop_id=${shopId || ""}&version=${VERSION}`;
        const { signature, timestamp } = common_1.default.signByUrl(myUrl, appSecret);
        const url = `${myUrl}&timestamp=${timestamp}&sign=${signature}`;
        const headers = {
            "x-tts-access-token": accessToken,
        };
        return { url, headers, data: bodyData };
    }
    getShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/authorization/${VERSION}/shops`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/${VERSION}/products/${id}`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    searchInventory(bodyData = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/${VERSION}/inventory/search`, bodyData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/${VERSION}/products`, productData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSellerShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/seller/${VERSION}/shops`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    recommendCategory(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.recommendationSchema.validate(product);
            if (error) {
                throw new Error(`Invalid data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/categories/recommend`, product);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}`, productData);
            try {
                const response = yield axios_1.default.put(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/logistics/${VERSION}/warehouses`);
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProductPrices(id, skus) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productPricesSchema.validate(skus);
            if (error) {
                throw new Error(`Invalid SKU data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/prices/update`, skus);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    partiallyEditProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productPartailEditSchema.validate(productData);
            if (error) {
                throw new Error(`Invalid product data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/partial_edit`, productData);
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategoryAttributes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/categories/${id}/attributes`, {
                locale: LOCALE,
            });
            try {
                const response = yield axios_1.default.get(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProductInventory(id, skus) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.skuInventorySchema.validate(skus);
            if (error) {
                throw new Error(`Invalid SKU data: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/${id}/inventory/update`, {
                skus,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    activateProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/activate`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deactivateProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/deactivate`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products`, { product_ids: productIds });
            try {
                const response = yield axios_1.default.delete(url, { headers, data });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    recoverProducts(productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = schemas_1.productIdsSchema.validate(productIds);
            if (error) {
                throw new Error(`Invalid product ids: ${error.details[0].message}`);
            }
            const { url, headers, data } = this.generateRequestSign(`/product/${VERSION}/products/recover`, {
                product_ids: productIds,
            });
            try {
                const response = yield axios_1.default.post(url, data, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TikTok;
