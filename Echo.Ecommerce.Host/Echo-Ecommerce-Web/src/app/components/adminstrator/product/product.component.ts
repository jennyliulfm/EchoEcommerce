import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { ProductService } from '../../../services/product.service'
import { Product, Category} from 'src/app/models/model';
import { ToastrService } from 'ngx-toastr';


interface ProductForm {
  title: string;
  description: string;
  price: string;
  cateogry: Category;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('productModal', { static: false }) productModal: ModalDirective;
  
  public products?: Array<Product> ;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService) { 

    }

  ngOnInit(): void {
    
    this.getAllProducts();  
  }

  /**
   * Get all products
   */
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res;
        console.log(res);    
        console.log(this.products);
      },
      err => {
        console.error("ERROR: createUser", err);     
      }
    )
  }
  /**
   * Open product moda.
   */
  openProductModal() {
    this.productModal.show();
  }

  public readonly productGroupModel: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
  });

  get productFormGroupValue(): ProductForm {
    return this.productGroupModel.value;
  }

  /**
   * 
   */

  closeProductModal() {
   this.productModal.hide();
  }

  /**
   * Create new product
   */
  createProduct() {

    const args: Product = {
      title: this.productFormGroupValue.title,
      price: this.productFormGroupValue.price,
      description: this.productFormGroupValue.description,
      category: this.productFormGroupValue.cateogry,
      productId: 0
    };

    this.productService.createNewProduct(args).subscribe(
      res => {
        if (res) {
          this.toasterService.success(`Product has been creates successfully`);
          
          this.productModal.hide(); 
          this.productGroupModel.reset();     
          
          this.getAllProducts();
        }       
      },
      err => {
        console.error("ERROR: createProduct", err);     
      }
    )

  }

}
