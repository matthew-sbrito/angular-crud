import { Component, OnInit } from '@angular/core';

import { ProductService } from '@services/product.service';
import { Product } from '@models/product';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'action'];

  customSwal: any;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.handleProducts();
    this.customSwal = Swal.mixin({
      customClass: {
        confirmButton: 'button-theme',
      },
    });
  }

  handleProducts(): void {
    this.spinner.show();
    this.productService
      .find()
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
        },
        error: (error) =>
          this.toastr.error('Erro ao carregar lista de produtos!'),
      })
      .add(() => this.spinner.hide());
  }

  destroy(product: Product): void {
    this.spinner.show();
    this.productService
      .destroy(product)
      .subscribe({
        next: () => {
          this.toastr.success('Produto deletado com sucesso!');
          this.handleProducts();
        },
        error: (error) =>
          this.toastr.error('Erro ao carregar lista de produtos!'),
      })
      .add(() => this.spinner.hide());
  }

  async confirmDestroy(product: Product): Promise<void> {

    const options: SweetAlertOptions = {
      title: 'Atenção!',
      text: `Deseja apagar ${product.name}?`,
      icon: 'warning',
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true,
      reverseButtons: true,
    }

    const confirmed = await this.customSwal.fire(options);

    if (confirmed.isConfirmed) {
      this.destroy(product);
    }
  }
}
