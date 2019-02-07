import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuitemsComponent, AddedToCartComponent } from './pages/menuitems/menuitems.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AddheaderinterceptorService } from './auth/addheaderinterceptor.service';
import { AuthLoginGuardService } from './auth/authloginguard.service';
import { CartService } from './services/cart.service';
import { AuthService } from './auth/auth.service';
import { ItemService } from './services/item.service';
import { OrderComponent, OrderSuccessfulComponent } from './pages/order/order.component';
import { AuthGuardService } from './auth/authguard.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    MenuitemsComponent,
    RegisterComponent,
    LoginComponent,
    AddedToCartComponent,
    OrderSuccessfulComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatChipsModule,
    MatStepperModule,
    MatTooltipModule,

    HttpClientModule
  ],
  entryComponents: [
    AddedToCartComponent,
    OrderSuccessfulComponent
  ],
  providers: [AuthLoginGuardService, AuthGuardService, CartService, AuthService, ItemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddheaderinterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
