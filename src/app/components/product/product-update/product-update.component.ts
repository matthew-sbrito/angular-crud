import { Stock } from './../../../models/stock';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '@services/product/product.service';
import { Product } from '@models/product';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  currentId!: number;
  subscription!: Subscription;
  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.product = {} as Product;
    this.product.stock = {} as Stock;

    this.subscription = this.route.params.subscribe(
      (params) => this.currentId = params['id']
    )

    this.handleProduct();
  }

  handleProduct(): void {
    this.spinner.show();
    this.productService
      .findOne(this.currentId)
      .subscribe({
        next: (product: Product) => {
          console.log(product);
          this.product = product;
        },
        error: (err: Error) => {
          console.error(err)
          this.toastr.error('Erro ao carregar produto!');
          // this.router.navigate(['/products']);
        },
      })
      .add(() => this.spinner.hide());
  }

  save(): void {
    this.spinner.show();
    this.productService
      .update(this.product.getBody())
      .subscribe({
        next: (product: Product) => {
          this.product = product;
          this.toastr.success('Produto atualizado com sucesso!');
          this.router.navigate(['/products']);
        },
        error: (err: Error) => this.toastr.error('Erro ao atualizar produto!'),
      })
      .add(() => this.spinner.hide());
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
