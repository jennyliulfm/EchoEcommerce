import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { CartService } from '../../services/cart.service';
import { Product, CartProduct } from 'src/app/models/model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products?: Array<Product>
  private productSelected?: Array<Product>;

  constructor(
    private productService: ProductService,
    private chartService: CartService) { }

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

  /**
   * Addtocart
   */
  addToCart(event, product: Product) {

    const cartProductAdded: CartProduct  = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      amount: 1,
    };
    
    this.chartService.addProductToCart( cartProductAdded );
  }

}
