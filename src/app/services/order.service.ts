import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) { }

    createOrder(fullname: string, address: string, phonenumber: string) {
        const url = 'http://localhost:3000/create-order';
        return this.http.post(url, { fullname, address, phonenumber });
    }

}
