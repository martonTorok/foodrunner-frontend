import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

export class Item {
    constructor(
        public name: string,
        public category: string,
        public description: string,
        public price: number,
        public spicy: boolean,
        public vegatarian: boolean
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class ItemAdapter implements Adapter<Item> {
    adapt(item: any): Item {
        return new Item(
            item.name,
            item.category,
            item.description,
            item.price,
            item.spicy,
            item.vegatarian
        )
    }
}