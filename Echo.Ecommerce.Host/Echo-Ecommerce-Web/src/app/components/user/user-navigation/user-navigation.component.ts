import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NavigationItem } from 'src/app/models/navigation';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {

  @Input() isNavigationOpen: boolean;

  public dropdownIndex = -1;
  public activeRoute: string;
  public isAdmin: boolean = false;
  private currentUser?: User;

  public pages: Array<NavigationItem> = [
    { name: 'Personal information', icon: 'fa-building', route: '', },
    { name: 'Address management', icon: 'fa-building', route: '', },
    { name: 'Order history', icon: 'fa-shopping-cart', route: '', },

  ];

  constructor(
    private router: Router,
    private userService: UserService) {
    // Watch for route changes
    router.events.subscribe(val => {
      const route: any = val;
      if (route.url) { this.activeRoute = route.url; }
    });
  }

  ngAfterViewInit() {
  }

  ngOnChanges() {
  }

  ngOnInit(): void {

  }

  logout() {

  }

  openDropdown(index: number) {
    this.dropdownIndex = index !== this.dropdownIndex ? index : -1;
  }

  checkAdmin() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.currentUser = res;
      },
      err => {
      }
    )
  }

}
