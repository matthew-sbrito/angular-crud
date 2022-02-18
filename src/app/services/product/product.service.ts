import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  _url = `${environment._api}/products`;

  find(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._url);
  }

  findOne(id: number): Observable<Product> {
    const url = `${this._url}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this._url, product);
  }

  update(product: Product): Observable<Product> {
    const id  = product.id;
    const url = `${this._url}/${id}`;
    return this.httpClient.put<Product>(url, product);
  }

  destroy(product: Product): Observable<any> {
    const id  = product.id;
    const url = `${this._url}/${id}`;
    return this.httpClient.delete(url);
  }
}
