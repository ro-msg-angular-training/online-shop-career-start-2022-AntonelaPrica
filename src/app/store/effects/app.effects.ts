import { AuthEffects } from './auth.effects';
import { ProductListEffects } from './product-list.effects';
import { ProductEffects } from './product.effect';
import { CartEffects } from './cart.effects';

export const AppEffects = [AuthEffects, ProductEffects, ProductListEffects, CartEffects];
