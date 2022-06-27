import { Product } from '../../model/Product';

export interface ProductListState {
	products: Product[];
	loading: boolean;
	error: boolean;
}

export const initialProductListState: ProductListState = {
	products: [],
	loading: false,
	error: false,
};
