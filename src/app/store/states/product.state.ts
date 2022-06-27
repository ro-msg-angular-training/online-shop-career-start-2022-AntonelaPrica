import { Product } from '../../model/Product';

export interface ProductState {
	currentProduct: Product | null;
	loading: boolean;
	error: boolean;
}

export const initialProductState: ProductState = {
	currentProduct: null,
	loading: false,
	error: false,
};
