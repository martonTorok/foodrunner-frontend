import { Item } from './item.model';

export class Cart {
    public totalPrice: number
    public totalQuantity: number
    public cartItems: Item[]
}