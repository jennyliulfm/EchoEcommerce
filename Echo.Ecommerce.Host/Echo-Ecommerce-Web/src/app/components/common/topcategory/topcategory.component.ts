import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { timestamp } from 'rxjs/operators';
import { categoryColumnNumber } from '../../../models/appConf'
import { BannerPhoto } from 'src/app/models/model';

@Component({
  selector: 'app-topcategory',
  templateUrl: './topcategory.component.html',
  styleUrls: ['./topcategory.component.css']
})
export class TopcategoryComponent implements OnInit {

  categroyData: Array<BannerPhoto> = [];
  public rowNumber: number = 0;
  public columNumber: number = categoryColumnNumber;
  public rowArray: Array<number> = [];
  public columArray: Array<number> = [];

  customOptions: OwlOptions = {
    items: 5,
    loop: true,
    autoplay: false,
    center: true,
    dots: true,
    dotsEach: true,
    mergeFit: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      }
    },
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
    ]
  }

  constructor() { }

  ngOnInit(): void {
    this.getCategoryData();
  }


  /**
   * 
   */
  getCategoryData() {
    this.categroyData = [
      {
        id: 1,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat1.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat1.png',
        name: "Clothing"
      },
      {
        id: 2,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat2.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat2.png',
        name: "Eating"
      },
      {
        id: 3,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat3.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat3.png',
        name: "Sports"
      },

      {
        id: 4,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat4.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat4.png',
        name: "Wellbeing"
      },
      {
        id: 5,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat5.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat5.png',
        name: "Skirts"
      },
      {
        id: 6,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat6.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat6.png',
        name: "Electronics"
      },
      {
        id: 7,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat7.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat7.png',
        name: "Fresh Fruit"
      },
      {
        id: 8,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat8.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat8.png',
        name: "Clothing"
      },
      {
        id: 9,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat9.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat9.png',
        name: "Clothing"
      },
      {
        id: 10,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat10.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat10.png',
        name: "Clothing"
      },
      {
        id: 1,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat1.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat1.png',
        name: "Clothing"
      },
      {
        id: 2,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat2.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat2.png',
        name: "Eating"
      },
      {
        id: 3,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat3.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat3.png',
        name: "Sports"
      },

      {
        id: 4,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat4.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat4.png',
        name: "Wellbeing"
      },
      {
        id: 5,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat5.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat5.png',
        name: "Skirts"
      },
      {
        id: 6,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat6.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat6.png',
        name: "Electronics"
      },
      {
        id: 7,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat7.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat7.png',
        name: "Fresh Fruit"
      },
      {
        id: 8,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat8.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat8.png',
        name: "Clothing"
      },
      {
        id: 9,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat9.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat9.png',
        name: "Clothing"
      },
      {
        id: 10,
        title: "Testing1",
        url: '../../../assets/styles/images/categories/cat10.png',
        thumbnailUrl: '../../../assets/styles/images/categories/cat10.png',
        name: "Clothing"
      },



    ];

    this.rowNumber = this.categroyData.length / this.columNumber;
    if (this.categroyData.length % this.columNumber != 0) {
      this.rowNumber = this.categroyData.length / this.columNumber + 1;
    }

    this.rowArray = Array.apply(null, { length: this.rowNumber }).map(Number.call, Number);
    this.columArray = Array.apply(null, { length: this.columNumber }).map(Number.call, Number);
  }
}
