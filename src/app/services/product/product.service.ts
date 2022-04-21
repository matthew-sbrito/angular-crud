import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable} from 'rxjs';
import { Product } from '@models/product';
import { environment } from 'src/environments/environment';
import {Paging} from "../../shared/table/table.model";

type ResponseFind = {
  products: Product[];
  paging: any;
};

type ResponseFindOne = {
  product: Product;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  _url = `${environment._api}/product`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  find({ currentPage, perPage }: Paging): Observable<ResponseFind> {
    console.log(currentPage, perPage)
    const url = `${this._url}/index`;
    const params = new HttpParams()
      .set("limit", perPage)
      .set("page", currentPage);

    return this.httpClient
      .get<ResponseFind>(url, { params })
      .pipe(
        map( data => {
          data.products = Product.streamList(data.products)
          return data;
        }),
        catchError( this.handleError)
      );
  }



  findOne(id: number): Observable<Product> {
    const url = `${this._url}/show/${id}`;
    return this.httpClient
      .get<ResponseFindOne>(url)
      .pipe(map( data => Product.fromAPI(data)));
  }

  create(product: Product): Observable<Product> {
    const url = `${this._url}/save`;
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

  private handleError(err: any, caught: Observable<any>): never {
    console.log(err, caught)
    throw 'Details error';
  }
}
