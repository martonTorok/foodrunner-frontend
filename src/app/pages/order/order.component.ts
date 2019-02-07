import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  fullNameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  phoneNumberFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fullNameFormGroup = this._formBuilder.group({
      fullNameCtrl: ['', Validators.required]
    });
    this.addressFormGroup = this._formBuilder.group({
      addressCtrl: ['', Validators.required]
    });
    this.phoneNumberFormGroup = this._formBuilder.group({
      phoneNumberCtrl: ['', Validators.required]
    })
  }

  onSubmitOrder() {
    const fullname = this.fullNameFormGroup.value.fullNameCtrl;
    const address = this.addressFormGroup.value.addressCtrl;
    const phonenumber = this.phoneNumberFormGroup.value.phoneNumberCtrl;
    this.orderService.createOrder(fullname, address, phonenumber)
      .subscribe(order => {
        this.cartService.emptyCart()
          .subscribe(cart => {
            this.cartService.cartChanged.next(cart);
            this.snackBar.openFromComponent(OrderSuccessfulComponent, {
              duration: 3000,
            });
            this.router.navigate(['/home'])
          });
      }, err => {
        console.log(err);
      })
  }
  
}

@Component({
  selector: 'order-successful-component',
  template: `<span class="orderSuccessful">
              Your order was successful! 
              </span>`,
  styles: [`
    .orderSuccessful {
      color: lightgreen;
      font-size: 1em;
    }
  `],
})
export class OrderSuccessfulComponent { }
