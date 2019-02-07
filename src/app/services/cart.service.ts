import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartChanged: Subject<Cart> = new Subject();

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart> {
    const url = 'http://localhost:3000/cart';
    return this.http.get<Cart>(url);
  }

  addToCart(id: number): Observable<Cart> {
    const url = `http://localhost:3000/add-to-cart/${id}`;
    return this.http.post<Cart>(url, {})
      .pipe(tap(cart => {
        this.cartChanged.next(cart);
      }))
  }

  removeFromCart(id: number): Observable<Cart> {
    const url = `http://localhost:3000/remove-from-cart/${id}`
    return this.http.post<Cart>(url, {})
      .pipe(tap(cart => {
        this.cartChanged.next(cart);
      }))
  }

  emptyCart() {
    const url = 'http://localhost:3000/empty-cart';
    return this.http.delete<Cart>(url)
      .pipe(tap(cart => {
        this.cartChanged.next(cart);
      }))
  }
}
