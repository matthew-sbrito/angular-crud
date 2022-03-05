import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '@models/product';
import { environment } from 'src/environments/environment';

type ResponseFind = {
  products: Product[];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  _url = `${environment._api}/produto`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  transformData(response: any) {
    tap(console.log);
    return response;
  }

  find(): Observable<Product[]> {
    const url = `${this._url}/index`;
    return this.httpClient
      .get<ResponseFind>(url)
      .pipe(map( data => Product.streamList(data.products)));
  }

  findOne(id: number): Observable<Product> {
    const url = `${this._url}/show/${id}`;
    return this.httpClient
      .get<Product>(url)
      .pipe(map( data => Product.fromAPI(data)));
  }

  create(product: Product): Observable<Product> {
    const url = `${this._url}/create`;
    return this.httpClient.post<Product>(url, product);
  }

  update(product: Product): Observable<Product> {
    const id = product.id;
    const url = `${this._url}/update/${id}`;
    return this.httpClient.put<Product>(url, product);
  }

  destroy(product: Product): Observable<any> {
    const id = product.id;
    const url = `${this._url}/delete/${id}`;
    return this.httpClient.delete(url);
  }
}
