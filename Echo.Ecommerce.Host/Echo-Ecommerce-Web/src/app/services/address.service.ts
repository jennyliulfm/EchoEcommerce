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

<<<<<<< HEAD
  /**
   * 
   */
=======
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
  getAllAddresses(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(this.BaseURL + '/GetAllAddressForUser');
  }
<<<<<<< HEAD

  /** */
  createNewAddress(address: Address):Observable<Address>{
    return this.http.post<Address>(this.BaseURL+'/AddAddressForUser',address);
=======
  createAddress(address: Address):Observable<any>{
    return this.http.post(this.BaseURL+'/AddAddressForUser',address);
>>>>>>> 8e1754e62b96960d82f1d8982ce3adce9259602f
  }
}
