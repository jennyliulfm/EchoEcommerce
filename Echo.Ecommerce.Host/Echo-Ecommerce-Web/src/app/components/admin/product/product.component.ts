import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { ProductService } from '../../../services/product.service'
import { CategoryService } from '../../../services/category.service'
import { Product, Category } from 'src/app/models/model';
import { ToastrService } from 'ngx-toastr';


interface ProductForm {
  name: string;
  description: string;
  price: number;
  cateogryId: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('productModal', { static: false }) productModal: ModalDirective;

  public products?: Array<Product>;
  public categories?: Array<Category>;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  /**
   * 
   */


  /**
   * Get all products
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

  public readonly productGroupModel: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    categoryId: ['', Validators.required],
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
  * Open product moda.
  */
  openProductModal() {
    this.productModal.show();
  }
  /**
   * Create new product
   */
  createProduct() {
    const args: Product = {
      name: this.productFormGroupValue.name,
      price: Number(this.productFormGroupValue.price),
      description: this.productFormGroupValue.description,
      category: this.getSelectedCategory(),
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

  /**
   * Get all cateogries
   */
  getAllCategories() {
    this.categoryService.getAllCateogries().subscribe(
      res => {
        this.categories = res;
      },

      err => {
        console.log("ERROR: getAllCategories")
      }
    )
  }

  /**
   * Get Category By Id
   */
  getSelectedCategory() {
    console.log(this.productGroupModel.value.categoryId);
    for (let category of this.categories) {
      if (category.categoryId == Number(this.productGroupModel.value.categoryId)) {
        return category;
      }
    }

  }

}
