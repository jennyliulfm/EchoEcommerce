import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {

  public isNavigationOpen = false;

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('body-small');
  }

  onResize() {
  }

  onNavigationToggle(bool: boolean): void {
    const body = document.getElementsByTagName('body')[0];
    if (bool) {
      body.classList.add('mini-navbar');
    } else {
      body.classList.remove('mini-navbar');
    }
  }

}
