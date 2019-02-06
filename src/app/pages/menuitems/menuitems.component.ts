import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCurrentCategory();
    this.getItemsByCategory(this.currentCategory);
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
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

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  onBuy(itemId: number) {
    this.cartService.addToCart(itemId)
      .subscribe(cart => {
        
      })
  }
}
