import type { Product, Recommendation, ProductPrices, SkuInventory, ProductPartialEdit, ProductIds } from "./type";
interface TikTokConfig {
    appKey: string;
    accessToken: string;
    shopChiper?: string;
    shopId?: string;
    appSecret: string;
}
declare class TikTok {
    private appKey;
    private accessToken;
    private shopChiper?;
    private shopId?;
    private appSecret;
    constructor({ appKey, accessToken, shopChiper, shopId, appSecret, }: TikTokConfig);
    private generateRequestSign;
    getShops(): Promise<any>;
    getProduct(id: string): Promise<any>;
    searchInventory(bodyData?: {}): Promise<any>;
    addProduct(productData: Product): Promise<any>;
    getSellerShops(): Promise<any>;
    recommendCategory(product: Recommendation): Promise<any>;
    updateProduct(id: string, productData: Product): Promise<any>;
    getWarehouses(): Promise<any>;
    updateProductPrices(id: string, skus: ProductPrices): Promise<any>;
    partiallyEditProduct(id: string, productData: ProductPartialEdit): Promise<any>;
    getCategoryAttributes(id: string): Promise<any>;
    updateProductInventory(id: string, skus: SkuInventory[]): Promise<any>;
    activateProducts(productIds: ProductIds): Promise<any>;
    deactivateProducts(productIds: ProductIds): Promise<any>;
    deleteProducts(productIds: ProductIds): Promise<any>;
    recoverProducts(productIds: ProductIds): Promise<any>;
}
export default TikTok;
