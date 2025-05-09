import { shape, number, string } from 'prop-types';

export const ingredientTypes = shape({
	_id: string.isRequired,
	name: string.isRequired,
	type: string.isRequired,
	proteins: number.isRequired,
	fat: number.isRequired,
	carbohydrates: number.isRequired,
	calories: number.isRequired,
	price: number.isRequired,
	image: string.isRequired,
	image_mobile: string.isRequired,
	image_large: string.isRequired,
	__v: number.isRequired,
});

export const groupTypes = shape({
	id: number.isRequired,
	name: string.isRequired,
	title: string.isRequired,
	value: string.isRequired,
});
