import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '@services/product.service';
import { Product } from '@models/product';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {} as Product;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.spinner.show();
    this.productService
      .create(this.product)
      .subscribe({
        next: (product: Product) => {
          this.toastr.success(`Produto com id ${product.id} criado!`);
          this.router.navigate(['/products']);
        },
        error: (error) => this.toastr.error('Erro ao criar produto!'),
      })
      .add(() => this.spinner.hide());
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
