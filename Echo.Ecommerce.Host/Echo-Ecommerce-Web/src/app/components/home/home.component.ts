import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products?: Array<Product>
  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  /**
   * Get All products
   */
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res;
      },
      err => {
        console.error("Error: getAllProducts", err);
      }
    )
  }
  
}
