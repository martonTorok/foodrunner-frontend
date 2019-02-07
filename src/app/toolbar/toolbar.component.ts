import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  totalItemQuantity: number;
  totalPrice: number;
  cartItems: Item[];
  removeDisabled: boolean = false;
  addDisabled: boolean = false;

  constructor(private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit() {
    this.getCartItems();
  }


  getCartItems() {
    this.cartService.getCartItems()
      .subscribe(cart => {
        this.totalPrice = cart.totalPrice;
        this.totalItemQuantity = cart.totalQuantity;
        this.cartItems = cart.cartItems;
      }, err => {
        console.error(err);
      })
    this.cartService.cartChanged
      .subscribe(cart => {
        this.totalPrice = cart.totalPrice;
        this.totalItemQuantity = cart.totalQuantity;
        this.cartItems = cart.cartItems;
      }, err => {
        console.log(err);
      })
  }

  onAddItem(id: number) {
    this.addDisabled = true;
    this.cartService.addToCart(id)
      .subscribe(cart => {
        this.cartService.cartChanged.next(cart);
        this.addDisabled = false;
      }, err => {
        console.log(err);
        this.addDisabled = false;
      })
  }
  onRemoveItem(id: number) {
    this.removeDisabled = true;
    this.cartService.removeFromCart(id)
      .subscribe(cart => {
        this.cartService.cartChanged.next(cart);
        this.removeDisabled = false;
      }, err => {
        console.log(err);
        this.removeDisabled = false;
      })
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
