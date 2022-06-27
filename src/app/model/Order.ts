import { OrderItem } from './OrderItem';

export interface Order {
	customer: string;
	products: OrderItem[];
}
