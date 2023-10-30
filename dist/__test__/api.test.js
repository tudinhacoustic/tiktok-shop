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
const api_1 = __importDefault(require("../api/api"));
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
describe("TikTok API", () => {
    let tikTok;
    let validProductData;
    let invalidProductData;
    let validProductIds;
    let validSkuData;
    let validSkuPriceData;
    let validCategoryData;
    beforeEach(() => {
        jest.resetAllMocks();
        tikTok = new api_1.default({
            appKey: "test",
            accessToken: "test",
            shopChiper: "test",
            shopId: "test",
            appSecret: "test",
        });
        validProductData = {
            description: "Test Product",
            category_id: "test",
            main_images: [{ src: "http://example.com", width: 1000, height: 1000 }],
            skus: [
                {
                    id: "test",
                    sales_attributes: [
                        {
                            id: "test",
                            name: "test",
                            sku_img: { src: "http://example.com", width: 1000, height: 1000 },
                            value_id: "test",
                            value_name: "test",
                        },
                    ],
                    price: { amount: "100", currency: "DOLLARS" },
                    inventory: [{ warehouse_id: "test", quantity: 1 }],
                },
            ],
            title: "Test Product",
            package_weight: { unit: "KILOGRAM", value: 1 },
        };
        invalidProductData = {
            description: "",
            category_id: "test",
            main_images: [{ src: "http://example.com", width: 1000, height: 1000 }],
            title: "Test Product",
            package_weight: { unit: "KILOGRAM", value: 1 },
        };
        validProductIds = ["test1", "test2", "test3"];
        validSkuPriceData = {
            skus: [
                {
                    id: "test",
                    sales_attributes: [
                        {
                            id: "test",
                            name: "test",
                            sku_img: {
                                src: "http://example.com/test.jpg",
                                width: 1,
                                height: 1,
                            },
                            value_id: "test",
                            value_name: "test",
                        },
                    ],
                    price: {
                        amount: "test",
                        currency: "DOLLARS",
                    },
                    inventory: [{ quantity: 10, warehouse_id: "1" }],
                },
            ],
        };
        validSkuData = [{
                id: "test_sku_id",
                inventory: [
                    {
                        quantity: 10
                    }
                ]
            }];
        validCategoryData = {
            product_title: "Test Product",
            description: "Test Description",
        };
    });
    it("call without shop params ", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        tikTok = new api_1.default({
            appKey: "test",
            accessToken: "test",
            appSecret: "test",
        });
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getProduct("test");
        expect(data).toBe("test");
    }));
    it("getProduct", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getProduct("test");
        expect(data).toBe("test");
    }));
    it("searchInventory", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.searchInventory({ test: "test" });
        expect(data).toBe("test");
    }));
    it("adds a product to the TikTok API", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.addProduct(validProductData);
        expect(data).toBe("test");
    }));
    it("throws an error when the product data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(tikTok.addProduct(invalidProductData)).rejects.toThrowErrorMatchingSnapshot();
    }));
    it("getShops", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getShops();
        expect(data).toBe("test");
    }));
    it("getSellerShops", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getSellerShops();
        expect(data).toBe("test");
    }));
    it("recommendCategory", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.recommendCategory(validCategoryData);
        expect(data).toBe("test");
    }));
    it("updateProduct", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.put.mockResolvedValue(resp);
        const data = yield tikTok.updateProduct("test", validProductData);
        expect(data).toBe("test");
    }));
    it("getWarehouses", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getWarehouses();
        expect(data).toBe("test");
    }));
    it("updateProductPrices", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.updateProductPrices("test", validSkuPriceData);
        expect(data).toBe("test");
    }));
    it("partiallyEditProduct", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.partiallyEditProduct("test", validProductData);
        expect(data).toBe("test");
    }));
    it("getCategoryAttributes", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.get.mockResolvedValue(resp);
        const data = yield tikTok.getCategoryAttributes("test");
        expect(data).toBe("test");
    }));
    it("updateProductInventory", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.updateProductInventory("test", validSkuData);
        expect(data).toBe("test");
    }));
    it("activateProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.activateProducts(validProductIds);
        expect(data).toBe("test");
    }));
    it("deactivateProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.deactivateProducts(validProductIds);
        expect(data).toBe("test");
    }));
    it("deleteProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.delete.mockResolvedValue(resp);
        const data = yield tikTok.deleteProducts(validProductIds);
        expect(data).toBe("test");
    }));
    it("recoverProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = { data: "test" };
        mockedAxios.post.mockResolvedValue(resp);
        const data = yield tikTok.recoverProducts(validProductIds);
        expect(data).toBe("test");
    }));
});
