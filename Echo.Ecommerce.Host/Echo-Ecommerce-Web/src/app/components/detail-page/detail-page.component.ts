import { Component, OnInit } from '@angular/core';
import { CardProduct } from 'src/app/models/model';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  route: ActivatedRoute;

  constructor() { }

  selectedItem?: CardProduct 
  
  ngOnInit(): void {
    this.route.params
    .pipe(switchMap((params: Params) => { this.visibility='hidden'; return this.dishService.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';},
      errmess => this.errMess = <any>errmess);
  }

}
