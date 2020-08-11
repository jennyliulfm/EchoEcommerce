import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly BaseURL: string = "https://localhost:5001/Address";
  constructor(private http: HttpClient) { }

  /**
   * 
   */
  getAllAddresses(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(this.BaseURL + '/GetAllAddressForUser');
  }

  /** */
  createNewAddress(address: Address):Observable<Address>{
    return this.http.post<Address>(this.BaseURL+'/AddAddressForUser',address);
  }
}
