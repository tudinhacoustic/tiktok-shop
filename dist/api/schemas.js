"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdsSchema = exports.skuInventorySchema = exports.productPartailEditSchema = exports.productPricesSchema = exports.recommendationSchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const imageSchema = joi_1.default.object({
    src: joi_1.default.string().uri().required(),
    width: joi_1.default.number().required().max(4000),
    height: joi_1.default.number().required().max(4000),
});
const attributeSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    sku_img: imageSchema,
    value_id: joi_1.default.string().required(),
    value_name: joi_1.default.string().required(),
});
const priceSchema = joi_1.default.object({
    amount: joi_1.default.string().required(),
    currency: joi_1.default.string().valid('DOLLARS').required(),
});
const inventorySchema = joi_1.default.object({
    warehouse_id: joi_1.default.string().required(),
    quantity: joi_1.default.number().min(1).required(),
});
const skuSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    sales_attributes: joi_1.default.array().items(attributeSchema),
    price: priceSchema,
    inventory: joi_1.default.array().items(inventorySchema),
});
const packageWeightSchema = joi_1.default.object({
    unit: joi_1.default.string().valid('CENTIMETER', 'KILOGRAM', 'INCH', 'POUND').required(),
    value: joi_1.default.number().required(),
});
const certificationSchema = joi_1.default.object();
const videoSchema = joi_1.default.object({
    ratio: joi_1.default.string().valid('1:1').optional(),
    resolution: joi_1.default.string()
        .pattern(/HD 720P/)
        .optional(),
    duration: joi_1.default.number().min(20).max(60).optional(),
    selling_points: joi_1.default.array().items(joi_1.default.string()).max(2).optional(),
});
const productSchema = joi_1.default.object({
    description: joi_1.default.string().required().max(10000),
    category_id: joi_1.default.string().required(),
    brand_id: joi_1.default.string().optional(),
    main_images: joi_1.default.array().items(imageSchema).min(1).max(9).required(),
    skus: joi_1.default.array().items(skuSchema).required(),
    title: joi_1.default.string().required().min(1).max(255),
    is_cod_allowed: joi_1.default.boolean().optional(),
    certifications: joi_1.default.array().optional().items(certificationSchema),
    package_weight: packageWeightSchema.required(),
    product_attributes: joi_1.default.object().optional(),
    size_chart: joi_1.default.object().optional(),
    package_dimensions: joi_1.default.object().optional(),
    external_product_id: joi_1.default.string().optional(),
    delivery_option_ids: joi_1.default.array().items(joi_1.default.string()).optional(),
    video: videoSchema.optional(),
});
exports.productSchema = productSchema;
const productPartailEditSchema = joi_1.default.object({
    description: joi_1.default.string().optional().max(10000),
    category_id: joi_1.default.string().optional(),
    brand_id: joi_1.default.string().optional(),
    main_images: joi_1.default.array().items(imageSchema).min(1).max(9).optional(),
    skus: joi_1.default.array().items(skuSchema).optional(),
    title: joi_1.default.string().optional().min(1).max(255),
    is_cod_allowed: joi_1.default.boolean().optional(),
    certifications: joi_1.default.array().optional().items(certificationSchema),
    package_weight: packageWeightSchema.optional(),
    product_attributes: joi_1.default.object().optional(),
    size_chart: joi_1.default.object().optional(),
    package_dimensions: joi_1.default.object().optional(),
    external_product_id: joi_1.default.string().optional(),
    delivery_option_ids: joi_1.default.array().items(joi_1.default.string()).optional(),
    video: videoSchema.optional(),
});
exports.productPartailEditSchema = productPartailEditSchema;
const recommendationSchema = joi_1.default.object({
    product_title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.recommendationSchema = recommendationSchema;
const productPricesSchema = joi_1.default.object({
    skus: joi_1.default.array().items(skuSchema).required(),
});
exports.productPricesSchema = productPricesSchema;
const skuInventorySchema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.string().required(),
    inventory: joi_1.default.array()
        .items(joi_1.default.object({
        quantity: joi_1.default.number().required(),
    }))
        .required(),
}));
exports.skuInventorySchema = skuInventorySchema;
const productIdsSchema = joi_1.default.array().items(joi_1.default.string().required());
exports.productIdsSchema = productIdsSchema;
