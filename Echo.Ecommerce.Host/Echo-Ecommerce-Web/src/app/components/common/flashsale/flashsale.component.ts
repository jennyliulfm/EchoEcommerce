import { Component, OnInit } from '@angular/core';
import { CardProduct } from '../../../models/model';

@Component({
  selector: 'app-flashsale',
  templateUrl: './flashsale.component.html',
  styleUrls: ['./flashsale.component.css']
})
export class FlashsaleComponent implements OnInit {

  public products: Array<CardProduct> = [];

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }


  /**
   * 
   */
  getProducts() {
    this.products = [
      {
        id: 1,
        title: "Toshiba Notebook with 500GB HDD & 8GB",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/nOFet9u.jpg",
        category: "Laptops & Notebooks",
        discount: 20,
        expiredHours: 2,
      },

      {
        id: 2,
        title: "Hygen Smart watch",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/VY0R9aV.png",
        category: "Electronics",
        discount: 13,
        expiredHours: 3,
      },
      {
        id: 3,
        title: "Hygen Smart watch",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/QQwcBpF.png",
        category: "Electronics",
        discount: 13,
        expiredHours: 20,
      },
      {
        id: 4,
        title: "Toshiba Notebook with 500GB HDD & 8GB",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/nOFet9u.jpg",
        category: "Laptops & Notebooks",
        discount: 20,
        expiredHours: 24,
      },

      // {
      //   id:5,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/VY0R9aV.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
      // {
      //   id:6,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/QQwcBpF.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
      // {
      //   id:1,
      //   title: "Toshiba Notebook with 500GB HDD & 8GB",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/nOFet9u.jpg",
      //   category: "Laptops & Notebooks",
      //   discount: 20,
      // },

      // {
      //   id:2,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/VY0R9aV.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
      // {
      //   id:3,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/QQwcBpF.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
      // {
      //   id:4,
      //   title: "Toshiba Notebook with 500GB HDD & 8GB",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/nOFet9u.jpg",
      //   category: "Laptops & Notebooks",
      //   discount: 20,
      // },

      // {
      //   id:5,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/VY0R9aV.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
      // {
      //   id:6,
      //   title: "Hygen Smart watch",
      //   description: "testing",
      //   price: 33.89,
      //   photo_url: "https://i.imgur.com/QQwcBpF.png",
      //   category: "Electronics",
      //   discount: 13,
      // },
    ]
  }

  /**
   * Trackby
   */
  trackbyPrdocutId(index: number, product: CardProduct): number {
    return product.id
  }
}
