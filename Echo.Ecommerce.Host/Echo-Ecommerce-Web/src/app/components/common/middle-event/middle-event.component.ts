import { Component, OnInit } from '@angular/core';
import { SalesEvent } from 'src/app/models/model';


@Component({
  selector: 'app-middle-event',
  templateUrl: './middle-event.component.html',
  styleUrls: ['./middle-event.component.css']
})
export class MiddleEventComponent implements OnInit {

  public events: Array<SalesEvent> =[];
  constructor() { }

  ngOnInit(): void {
    this.getSalesEvents();
  }

  /**
   * 
   */
  getSalesEvents() {
    this.events = [
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
      {
        id:3,
        name: "Mother's Day",
        photo_url: "../../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg",
        event_url: "../../../../assets/styles/images/banner/topbanner/rightsmall1.jpeg",     
      },
    ];
  }

}
