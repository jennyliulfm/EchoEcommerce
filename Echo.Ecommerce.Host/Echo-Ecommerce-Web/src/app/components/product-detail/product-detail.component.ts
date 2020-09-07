import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../services/logger.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number = 0;
  private sub: any;

  constructor(private route: ActivatedRoute, private logger: LoggerService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.logger.log("productId: " + this.productId);

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
