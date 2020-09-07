import { Component, OnInit } from '@angular/core';
import { CardProduct } from 'src/app/models/model';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.css']
})
export class PopularProductComponent implements OnInit {

  public products: Array<CardProduct> = [];
  constructor() { }

  ngOnInit(): void {
    this.getPopularProducts();
  }

  /**
   * 
   */
  getPopularProducts() {
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
        reviews:5,
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
        reviews:5,
      },
      {
        id: 3,
        title: "Hygen Smart watch",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/5Aqgz7o.jpg",
        category: "Electronics",
        discount: 13,
        expiredHours: 20,
        reviews:50,
      },
      {
        id: 4,
        title: "Apple iPhone XR(Red, 128 GB)",
        description: "testing",
        price: 33.89,
        photo_url: "https://i.imgur.com/5Aqgz7o.jpg",
        category: "Laptops & Notebooks",
        discount: 20,
        expiredHours: 24,
        reviews:15,
      },
    ];
  }

  trackbyPrdocutId(index: number, product: CardProduct): number {
    return product.id
  }

}
