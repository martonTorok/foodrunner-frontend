import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css']
})
export class MenuitemsComponent implements OnInit {
  menuItems: Item[];
  currentCategory: string;
  breakpoint: number;

  constructor(private itemService: ItemService,
    private cartService: CartService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCurrentCategory();
    this.getItemsByCategory(this.currentCategory);
  }

  getCurrentCategory() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentCategory = params['category'];
    })
  }

  getItemsByCategory(category: string): void {
    this.itemService.getItemsByCategory$(category)
      .subscribe(items => {
        this.menuItems = items;
      })
  }

  onAdd(itemId: number) {
    this.cartService.addToCart(itemId)
      .subscribe(cart => {
        this.cartService.cartChanged.next(cart);
      });

    this.snackBar.openFromComponent(AddedToCartComponent, {
      duration: 500,
    });
  }
}

@Component({
  selector: 'added-to-cart-component',
  template: `<span class="addedToCart">
              Added to cart.
              </span>`,
  styles: [`
    .addedToCart {
      color: white;
      font-size: 0.7em;
    }
  `],
})
export class AddedToCartComponent { }
