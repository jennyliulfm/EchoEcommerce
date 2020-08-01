import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/model';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service'
import { ToastrService } from 'ngx-toastr';

/**
 * Modal form data form
 */
interface CategoryForm {
  categoryName: string,
  description: string,
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('categoryModal', { static: false }) categoryModal: ModalDirective;
  
  public categories?: Array<Category>;

  /**
   * Modal form group
   */
  public readonly categoryModalGroup = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    });

  constructor( 
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService) {

     }

  ngOnInit(): void {
    this.getAllCategories();
  }


  /**
   * Get form group value
   */
  get categoryFormGroupValue(): CategoryForm {
    return this.categoryModalGroup.value;
  }

  /**
   * Open category modal
   */
  openCategoryModal(){
    this.categoryModal.show();
  }

  /**
   * Close category modal
   */
  closeCategoryModal(){
    this.categoryModalGroup.reset();
    this.categoryModal.hide();
  }

  /**
   * Create new category
   */
  createCategory() {

    const args: Category ={
      categoryName: this.categoryFormGroupValue.categoryName,
      description: this.categoryFormGroupValue.description,
      categoryId: 0
    };

    this.categoryService.createCategory(args).subscribe(
      res => {
        this.toastrService.success(`The product ${this.categoryFormGroupValue.categoryName} has been created succesfully`);
        this.closeCategoryModal();
        this.getAllCategories();
       
      },
      
      err => {
        console.log("ERROR: CreateCategory")
      }

    );

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

}
