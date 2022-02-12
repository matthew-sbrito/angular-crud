import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {} as Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.handleProduct();
  }

  handleProduct(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? 0;
    this.spinner.show();
    this.productService
      .findOne(+id)
      .subscribe({
        next: (product: Product) => {
          this.product = product;
        },
        error: (error) => {
          this.toastr.error('Erro ao carregar produto!');
          this.router.navigate(['/products']);
        },
      })
      .add(() => this.spinner.hide());
  }

  save(): void {
    this.spinner.show();
    this.productService
      .update(this.product)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.toastr.success('Produto atualizado com sucesso!');
          this.router.navigate(['/products']);
        },
        error: (error) => this.toastr.error('Erro ao atualizar produto!'),
      })
      .add(() => this.spinner.hide());
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
