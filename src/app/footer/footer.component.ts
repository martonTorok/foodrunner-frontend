import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CartComponent } from '../pages/cart/cart.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  totalItemQuantity: number;

  constructor(private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private cartService: CartService) { }

  ngOnInit() {
    this.getNrOfCartItems();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CartComponent);
  }

  getNrOfCartItems() {
    this.cartService.getCartItems()
      .subscribe(cart => {
        this.totalItemQuantity = cart.totalQuantity;
      }, err => {
        console.error(err);
      })
  }

}


