import { Component, OnInit,} from '@angular/core';

import {ProductService} from '@services/product/product.service';
import {Product} from '@models/product';

import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import Swal, {SweetAlertOptions} from 'sweetalert2';


@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'quantityMin', 'action'];
  listPerPage = [1, 2, 3];

  dataSource?: any;
  customSwal: any;

  perPage = 3;
  currentPage = 1;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.handleProducts();
    this.customSwal = Swal.mixin({
      customClass: {
        confirmButton: 'button-theme',
      },
    });
  }

  get paging(): any {
    return this.dataSource.paging;
  }

  page(page: string): void {
    switch (page) {
      case 'next':
        this.currentPage = this.currentPage + 1;
        break
      case 'previous':
        this.currentPage = this.currentPage - 1;
        break;
      case 'first':
        this.currentPage = 1;
        break
      case 'last':
        this.currentPage = this.paging.totalPages;
    }
    this.handleProducts()
  }

  changePage(): void {
    this.currentPage = 1;
    this.handleProducts()
  }

  handleProducts(): void {
    this.spinner.show();
    this.productService
      .find(this.perPage, this.currentPage)
      .subscribe({
        next: (response: any) => {
          this.dataSource  = response;
          this.currentPage = response.paging.currentPage;
          console.log(response)
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
    };

    const authorization = await this.customSwal.fire(options);

    if (authorization.isConfirmed) {
      this.destroy(product);
    }
  }
}
