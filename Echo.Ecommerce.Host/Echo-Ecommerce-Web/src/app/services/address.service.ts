import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly BaseURL: string ="https://localhost:5001/Address";
  constructor(private http: HttpClient) { }

  GetAllAddresses():Observable<Array<Address>> {
    return this.http.get<Array<Address>>( this.BaseURL + '/GetAllAddressForUser');

  }
}
