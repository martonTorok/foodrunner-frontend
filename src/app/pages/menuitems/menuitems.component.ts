import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.css']
})
export class MenuitemsComponent implements OnInit {
  menuItems: Item[];
  currentCategory: string;
  
  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) { }

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

}
