import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/smart/pages/login-page/login-page.component';
import { ProductDisplayComponent } from './components/smart/pages/product-display/product-display.component';
import { ProductListComponent } from './components/smart/pages/product-list/product-list.component';
import { ProductEditComponent } from './components/smart/pages/product-edit/product-edit.component';
import { AddProductComponent } from './components/smart/pages/add-product/add-product.component';
import { CartPageComponent } from './components/smart/pages/cart-page/cart-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/presentation/page-views/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'products', pathMatch: 'full' },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
	{ path: 'products/create', component: AddProductComponent, canActivate: [AuthGuard, AdminGuard] },
	{ path: 'products/:id/edit', component: ProductEditComponent, canActivate: [AuthGuard, AdminGuard] },
	{ path: 'products/:id', component: ProductDisplayComponent, canActivate: [AuthGuard] },
	{ path: 'cart', component: CartPageComponent, canActivate: [AuthGuard, CustomerGuard] },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
