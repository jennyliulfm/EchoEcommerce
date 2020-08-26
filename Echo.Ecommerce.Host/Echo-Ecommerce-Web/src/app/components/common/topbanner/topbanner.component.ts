import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface PhotosApi {
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-topbanner',
  templateUrl: './topbanner.component.html',
  styleUrls: ['./topbanner.component.css']
})
export class TopbannerComponent implements OnInit {
  apiData: Array<PhotosApi> = [];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    dotsEach:true,
    mergeFit:true,
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
    this.initData();
    console.log(this.apiData);
  
  }

  /**
   * 
   */
  initData() {
    this.apiData = [
      {
        id: 1,
        title:"Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner1.jpeg',
        thumbnailUrl:'../../../assets/styles/images/banner/topbanner/banner1.jpeg'
      }, 
      {
        id: 2,
        title:"Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner2.png',
        thumbnailUrl:'../../../assets/styles/images/banner/topbanner/banner2.png'
      }, 
      {
        id: 3,
        title:"Testing1",
        url: '../../../assets/styles/images/banner/topbanner/banner3.jpeg',
        thumbnailUrl:'../../../assets/styles/images/banner/topbanner/banner3.jpeg'
      }, 
    ];


  }

 

}
