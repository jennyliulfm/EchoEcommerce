import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-topnavigation',
  templateUrl: './topnavigation.component.html',
  styleUrls: ['./topnavigation.component.css']
})
export class TopnavigationComponent implements OnInit {

  @Input() isNavigationOpen: boolean;
  @Output() toggleNavigationEvent: EventEmitter<boolean> = new EventEmitter;
 
  public isSignupOpen = false;
  
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  toggleNavigation(): void {
    this.toggleNavigationEvent.emit(this.isNavigationOpen = !this.isNavigationOpen);
  }
  logout(): void {
    
  }

  signUp()
  {
    this.isSignupOpen = !this.isSignupOpen;
  }
}
