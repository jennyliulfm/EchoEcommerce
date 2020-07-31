export interface NavigationItem {
    name: string;
    icon: string;
    route?: string;
    isAdmin?: boolean;
    children?: NavigationItemChild[];
  }
  
  export interface NavigationItemChild {
    name: string;
    external: boolean;
    route: string;
    isAdmin?: boolean;
  }