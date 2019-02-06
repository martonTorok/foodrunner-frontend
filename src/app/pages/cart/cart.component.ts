import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[];
  removeDisabled: boolean = false;

  constructor(private cartService: CartService, private bottomSheetRef: MatBottomSheetRef<CartComponent>) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems()
      .subscribe(cart => {
        this.cartItems = cart.cartItems;
      }, err => {
        console.log(err);
      })
  }

  onRemove(id: number) {
    this.removeDisabled = true;
    this.cartService.removeFromCart(id)
      .subscribe(cart => {
        this.cartItems = cart.cartItems;
        this.removeDisabled = false;
      }, err => {
        console.log(err);
        this.removeDisabled = false;
      })
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}