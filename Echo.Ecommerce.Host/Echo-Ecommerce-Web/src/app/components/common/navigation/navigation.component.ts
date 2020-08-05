import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem, NavigationItemChild } from '../../../models/navigation';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {

  @Input() isNavigationOpen: boolean;

  public dropdownIndex = -1;
  public activeRoute: string;
  public isAdmin: boolean = false;
  private currentUser?: User;

  public pages: Array<NavigationItem> = [
    { name: 'Fruits & Vegetables', icon: 'fa-building', route: '', },
    { name: 'Meat', icon: 'fa-building', route: '', },
    { name: 'Milk', icon: 'fa-shopping-cart', route: '', },
    {
      name: 'Administration', icon: 'fa-shopping-cart', isAdmin: true, children: [
        { name: 'Product', external: false, route: '/admin/product', isAdmin: true },
        { name: 'Category', external: false, route: '/admin/category', isAdmin: true }
      ]
    }
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
