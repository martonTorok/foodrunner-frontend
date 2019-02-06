import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart> {
    const url = 'http://localhost:3000/cart';
    return this.http.get<Cart>(url);
  }

  removeFromCart(id: number): Observable<Cart> {
    const url = `http://localhost:3000/remove-from-cart/${id}`
    return this.http.post<Cart>(url, {});
  }
}
