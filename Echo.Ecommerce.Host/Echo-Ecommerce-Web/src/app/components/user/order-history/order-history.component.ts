import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[]=[];
  errMess: string = "";
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrdersForUser()
      .subscribe(res => {
        this.orders = res;
        console.log(res);
      },
        err => this.errMess = err);
  }

}
