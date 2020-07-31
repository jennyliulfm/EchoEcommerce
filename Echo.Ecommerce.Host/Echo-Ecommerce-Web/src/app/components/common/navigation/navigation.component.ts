import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../../models/navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnChanges {

  @Input() isNavigationOpen: boolean;

  
  public dropdownIndex = -1;
  public activeRoute: string;
  public pages: Array<NavigationItem> = [
    { name: 'Fruits & Vegetables', icon: 'fa-building', route: '', },
    { name: 'Meat', icon: 'fa-building', route: '', },
    { name: 'Milk', icon: 'fa-shopping-cart', route: '',},
    { name: 'Administration', icon: 'fa-shopping-cart', route: 'admin/product', }
  ];
  constructor(
    private router: Router,
    
  ) {
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
    // todo - current signed in user information
  }

  logout() {
  
  }

  openDropdown(index: number) {
    this.dropdownIndex = index !== this.dropdownIndex ? index : -1;
  }

}
