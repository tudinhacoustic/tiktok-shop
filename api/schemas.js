const Joi = require('joi');

const imageSchema = Joi.object({
	src: Joi.string().uri().required(),
	width: Joi.number().required().max(4000),
	height: Joi.number().required().max(4000),
});

const attributeSchema = Joi.object({
	id: Joi.string().required(),
	name: Joi.string().required(),
	sku_img: imageSchema,
	value_id: Joi.string().required(),
	value_name: Joi.string().required(),
});

const priceSchema = Joi.object({
	amount: Joi.string().required(),
	currency: Joi.string().valid('DOLLARS').required(),
});

const inventorySchema = Joi.object({
	warehouse_id: Joi.string().required(),
	quantity: Joi.number().min(1).required(),
});

const skuSchema = Joi.object({
	id: Joi.string().required(),
	sales_attributes: Joi.array().items(attributeSchema),
	price: priceSchema,
	inventory: Joi.array().items(inventorySchema),
});

const packageWeightSchema = Joi.object({
	unit: Joi.string().valid('CENTIMETER', 'KILOGRAM', 'INCH', 'POUND').required(),
	value: Joi.number().required(),
});
const certificationSchema = Joi.object(); 

const videoSchema = Joi.object({
	ratio: Joi.string().valid('1:1').optional(),
	resolution: Joi.string()
		.pattern(/HD 720P/)
		.optional(),
	duration: Joi.number().min(20).max(60).optional(),
	selling_points: Joi.array().items(Joi.string()).max(2).optional(),
});

const productSchema = Joi.object({
	description: Joi.string().required().max(10000),
	category_id: Joi.string().required(),
	brand_id: Joi.string().optional(),
	main_images: Joi.array().items(imageSchema).min(1).max(9).required(),
	skus: Joi.array().items(skuSchema).required(),
	title: Joi.string().required().min(1).max(255),
	is_cod_allowed: Joi.boolean().optional(),
	certifications: Joi.array().optional().items(certificationSchema),
	package_weight: packageWeightSchema.required(),
	product_attributes: Joi.object().optional(),
	size_chart: Joi.object().optional(),
	package_dimensions: Joi.object().optional(),
	external_product_id: Joi.string().optional(),
	delivery_option_ids: Joi.array().items(Joi.string()).optional(),
	video: videoSchema.optional(),
});
const productPartailEditSchema = Joi.object({
	description: Joi.string().optional().max(10000),
	category_id: Joi.string().optional(),
	brand_id: Joi.string().optional(),
	main_images: Joi.array().items(imageSchema).min(1).max(9).optional(),
	skus: Joi.array().items(skuSchema).optional(),
	title: Joi.string().optional().min(1).max(255),
	is_cod_allowed: Joi.boolean().optional(),
	certifications: Joi.array().optional().items(certificationSchema),
	package_weight: packageWeightSchema.optional(),
	product_attributes: Joi.object().optional(),
	size_chart: Joi.object().optional(),
	package_dimensions: Joi.object().optional(),
	external_product_id: Joi.string().optional(),
	delivery_option_ids: Joi.array().items(Joi.string()).optional(),
	video: videoSchema.optional(),
});

const recommendationSchema = Joi.object({
	product_title: Joi.string().required(),
	description: Joi.string().required(),
});

const productPricesSchema = Joi.object({
	skus: Joi.array().items(skuSchema).required(),
});

const skuInventorySchema = Joi.array().items(
	Joi.object({
		id: Joi.string().required(),
		inventory: Joi.array()
			.items(
				Joi.object({
					quantity: Joi.number().required(),
				})
			)
			.required(),
	})
);

const productIdsSchema = Joi.array().items(Joi.string().required());

module.exports = {
	productSchema,
	recommendationSchema,
	productPricesSchema,
	productPartailEditSchema,
	skuInventorySchema,
	productIdsSchema,
};
