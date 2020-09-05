import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { CartService } from '../../services/cart.service';
import { Product, CartProduct, SalesEvent } from 'src/app/models/model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public products?: Array<Product>
  private productSelected?: Array<Product>;
  public quantity: number;

  @ViewChild('bannerModal', { static: false })
  bannerModal: ModalDirective;

  @ViewChild('popbannertemplate')
  private popbannerTpl: TemplateRef<any>;

  public modalRef?: BsModalRef;
  public popupBanner?: SalesEvent;

  // Here we add another class to our (.modal.dialog)
  // and we need to pass this config when open our modal
  modalconfig = {
    class: 'modal-dialog-centered modal-md',
  }

  constructor(
    private productService: ProductService,
    private chartService: CartService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBannerData();
  }

  ngAfterViewInit() {
  
    this.openModal(this.popbannerTpl);
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
  addToCart(event, product: Product, quantity: number) {
    const cartProductAdded: CartProduct = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: quantity,
    };

    this.chartService.addProductToCart(cartProductAdded);
  }

  /**
   * 
   */
  closePopBanner() {
    if (this.bannerModal.isShown) {
      this.bannerModal.hide();
    }
  }

  /**
   * Open Popup Banner
   * @param template 
   */
  openModal(template: TemplateRef<any>) {
    // pass the config as second param
    this.modalRef = this.modalService.show(template, this.modalconfig );
  }

  /**
   * Get Banner Data
   */
  getBannerData() {
    this.popupBanner = {
      id:3,
      name: "Mother's Day",
      photo_url: "../../../../assets/styles/images/banner/topbanner/5.png",
      event_url: "../../../../assets/styles/images/banner/topbanner/5.png",   
    }
  }
}
