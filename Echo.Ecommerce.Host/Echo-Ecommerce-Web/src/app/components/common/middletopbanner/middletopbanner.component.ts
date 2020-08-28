import { Component, OnInit } from '@angular/core';
import { BannerPhoto } from 'src/app/models/model';

@Component({
  selector: 'app-middletopbanner',
  templateUrl: './middletopbanner.component.html',
  styleUrls: ['./middletopbanner.component.css']
})
export class MiddletopbannerComponent implements OnInit {

  public banner: BannerPhoto;
  public activities: Array<BannerPhoto> =[];
 

  constructor() { }

  ngOnInit(): void {
    this.getBanners();
  }

  /**
   * 
   */
  getBanners() {
    this.banner =
      {
        id: 1,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/middel-top/banner1.png',
        thumbnailUrl: '../../../assets/styles/images/banner/middel-top/banner1.png'
      };

      this.activities = [
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
     
  }
}
