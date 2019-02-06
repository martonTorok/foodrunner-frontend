import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItemsByCategory$(category: string) {
    const url = "http://localhost:3000/items";
    return this.http
      .get<Item[]>(url, {
        params: {
          category
        }
      });
  }
}
