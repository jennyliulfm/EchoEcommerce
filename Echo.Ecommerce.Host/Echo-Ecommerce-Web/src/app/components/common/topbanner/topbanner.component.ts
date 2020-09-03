import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BannerPhoto } from 'src/app/models/model';


@Component({
  selector: 'app-topbanner',
  templateUrl: './topbanner.component.html',
  styleUrls: ['./topbanner.component.css']
})
export class TopbannerComponent implements OnInit {
  topBannerPhotos: Array<BannerPhoto> = [];
  topBannerRightPhotos: Array<BannerPhoto> = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    dotsEach: true,
    
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    },
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
    ]
  }

  constructor(private readonly http: HttpClient,) { }

  ngOnInit(): void {
    this.getBanners();
    console.log(this.topBannerPhotos);

  }

  /**
   * 
   */
  getBanners() {
    this.topBannerPhotos = [
      {
        id: 1,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner1.jpeg',
        thumbnailUrl: '../../../assets/styles/images/banner/topbanner/banner1.jpeg'
      },
      {
        id: 2,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner2.png',
        thumbnailUrl: '../../../assets/styles/images/banner/topbanner/banner2.png'
      },
      {
        id: 3,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner3.jpeg',
        thumbnailUrl: '../../../assets/styles/images/banner/topbanner/banner3.jpeg'
      },
    ];

    this.topBannerRightPhotos = [
      {
        id: 1,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg',
        thumbnailUrl: '../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg'
      },

      {
        id: 2,
        title: "Testing1",
        url: '../../../assets/styles/images/banner/topbanner/rightsmall2.png',
        thumbnailUrl: '../../../assets/styles/images/banner/topbanner/rightsmall2.png'
      },

    ];
  }

}
