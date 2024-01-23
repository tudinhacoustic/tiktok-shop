import Joi from 'joi';
declare const productSchema: Joi.ObjectSchema<any>;
declare const productPartailEditSchema: Joi.ObjectSchema<any>;
declare const recommendationSchema: Joi.ObjectSchema<any>;
declare const productPricesSchema: Joi.ObjectSchema<any>;
declare const skuInventorySchema: Joi.ArraySchema<any[]>;
declare const productIdsSchema: Joi.ArraySchema<any[]>;
export { productSchema, recommendationSchema, productPricesSchema, productPartailEditSchema, skuInventorySchema, productIdsSchema, };
