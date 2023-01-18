import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDisplayComponent } from './components/smart/pages/product-display/product-display.component';
import { ProductListComponent } from './components/smart/pages/product-list/product-list.component';
import { LoginPageComponent } from './components/smart/pages/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/presentation/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ProductDetailsComponent } from './components/presentation/product-details/product-details.component';
import { ProductEditComponent } from './components/smart/pages/product-edit/product-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppEffects } from './store/effects/app.effects';
import { AppReducers } from './store/reducers/app.reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDeleteDialogComponent } from './components/smart/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from './components/smart/pages/add-product/add-product.component';
import { CartPageComponent } from './components/smart/pages/cart-page/cart-page.component';
import { ProductListViewComponent } from './components/presentation/page-views/product-list-view/product-list-view.component';
import { LoginPageViewComponent } from './components/presentation/page-views/login-page-view/login-page-view.component';
import { ProductDisplayViewComponent } from './components/presentation/page-views/product-display-view/product-display-view.component';
import { ProductEditViewComponent } from './components/presentation/page-views/product-edit-view/product-edit-view.component';
import { CartViewComponent } from './components/presentation/page-views/cart-view/cart-view.component';
import { ConfirmationDeleteDialogViewComponent } from './components/presentation/confirmation-delete-dialog-view/confirmation-delete-dialog-view.component';
import { PageNotFoundComponent } from './components/presentation/page-views/page-not-found/page-not-found.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		ProductDisplayComponent,
		ProductListComponent,
		LoginPageComponent,
		HeaderComponent,
		ProductDetailsComponent,
		ProductEditComponent,
		ConfirmationDeleteDialogComponent,
		AddProductComponent,
		CartPageComponent,
		ProductListViewComponent,
		LoginPageViewComponent,
		ProductDisplayViewComponent,
		ProductEditViewComponent,
		CartViewComponent,
		ConfirmationDeleteDialogViewComponent,
		PageNotFoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatTableModule,
		FormsModule,
		MatGridListModule,
		MatListModule,
		MatSnackBarModule,
		StoreModule.forRoot(AppReducers),
		EffectsModule.forRoot(AppEffects),
		!environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
		MatDialogModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
