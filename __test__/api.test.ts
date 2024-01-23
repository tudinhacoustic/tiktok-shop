import TikTok from "../api/api";
import axios from "axios";
jest.mock("axios");

import {
  Product,
  Recommendation,
  ProductPrices,
  SkuInventory,
  ProductIds,
} from "../api/type";

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TikTok API", () => {
  let tikTok: TikTok;
  let validProductData: Product;
  let invalidProductData: Partial<Product>;
  let validProductIds: ProductIds;
  let validSkuData: SkuInventory[];
  let validSkuPriceData: ProductPrices;
  let validCategoryData: Recommendation;
  beforeEach(() => {
    jest.resetAllMocks();
    tikTok = new TikTok({
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
    validSkuData =[ {
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
  it("call without shop params ", async () => {
    const resp = { data: "test" };
    tikTok = new TikTok({
      appKey: "test",
      accessToken: "test",
      appSecret: "test",
    });
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getProduct("test");
    expect(data).toBe("test");
  });
  it("getProduct", async () => {
    const resp = { data: "test" };
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getProduct("test");
    expect(data).toBe("test");
  });

  it("searchInventory", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.searchInventory({ test: "test" });
    expect(data).toBe("test");
  });

  it("adds a product to the TikTok API", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.addProduct(validProductData);
    expect(data).toBe("test");
  });

  it("throws an error when the product data is invalid", async () => {
    await expect(
      tikTok.addProduct(invalidProductData as any)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("getShops", async () => {
    const resp = { data: "test" };
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getShops();
    expect(data).toBe("test");
  });

  it("getSellerShops", async () => {
    const resp = { data: "test" };
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getSellerShops();
    expect(data).toBe("test");
  });

  it("recommendCategory", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.recommendCategory(validCategoryData);
    expect(data).toBe("test");
  });

  it("updateProduct", async () => {
    const resp = { data: "test" };
    mockedAxios.put.mockResolvedValue(resp);
    const data = await tikTok.updateProduct("test", validProductData);
    expect(data).toBe("test");
  });

  it("getWarehouses", async () => {
    const resp = { data: "test" };
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getWarehouses();
    expect(data).toBe("test");
  });

  it("updateProductPrices", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.updateProductPrices("test", validSkuPriceData);
    expect(data).toBe("test");
  });

  it("partiallyEditProduct", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.partiallyEditProduct("test", validProductData);
    expect(data).toBe("test");
  });

  it("getCategoryAttributes", async () => {
    const resp = { data: "test" };
    mockedAxios.get.mockResolvedValue(resp);
    const data = await tikTok.getCategoryAttributes("test");
    expect(data).toBe("test");
  });

  it("updateProductInventory", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.updateProductInventory("test", validSkuData);
    expect(data).toBe("test");
  });

  it("activateProducts", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.activateProducts(validProductIds);
    expect(data).toBe("test");
  });
  it("deactivateProducts", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.deactivateProducts(validProductIds);
    expect(data).toBe("test");
  });
  it("deleteProducts", async () => {
    const resp = { data: "test" };
    mockedAxios.delete.mockResolvedValue(resp);
    const data = await tikTok.deleteProducts(validProductIds);
    expect(data).toBe("test");
  });
  it("recoverProducts", async () => {
    const resp = { data: "test" };
    mockedAxios.post.mockResolvedValue(resp);
    const data = await tikTok.recoverProducts(validProductIds);
    expect(data).toBe("test");
  });
});
