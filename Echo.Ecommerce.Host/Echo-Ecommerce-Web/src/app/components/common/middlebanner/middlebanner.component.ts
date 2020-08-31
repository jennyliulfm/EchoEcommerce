import { Component, OnInit } from '@angular/core';
import { SalesEvent } from 'src/app/models/model';

@Component({
  selector: 'app-middlebanner',
  templateUrl: './middlebanner.component.html',
  styleUrls: ['./middlebanner.component.css']
})
export class MiddlebannerComponent implements OnInit {
  public salesEvents: Array<SalesEvent> =[];
  constructor() { }

  ngOnInit(): void {
    this.getSalesEvents();
  }

  getSalesEvents() {
    this.salesEvents = [
      {
        id:1,
        name: "Mother's Day",
        photo_url: "../../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg",
        event_url: "../../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg",       
      },
      {
        id:3,
        name: "Mother's Day",
        photo_url: "../../../../assets/styles/images/banner/topbanner/rightsmall2.png",
        event_url: "../../../../assets/styles/images/banner/topbanner/rightsmall2.png",       
      },
    ];
  }

}
