import { Component, OnInit,} from '@angular/core';

import {ProductService} from '@services/product/product.service';
import {Product} from '@models/product';

import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {
  ActionTable,
  DisplayedColumn,
  EventEmitterTable,
  Paging,
  TableDataSource
} from "../../../shared/table/table.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  displayedColumns: DisplayedColumn[] = [
    {
      columnDef: 'id',
      label: 'Código'
    },
    {
      columnDef: 'name',
      label: 'Nome'
    },
    {
      columnDef: 'price',
      label: 'Preço'
    },
    {
      columnDef: 'quantity',
      label: 'Quantidade'
    },
    {
      columnDef: 'quantityMin',
      label: 'Quantidade Minima'
    },
  ];

  actions: ActionTable[] = [
    {
      actionName: 'edit',
      icon: 'edit',
      color: '#d9cd26',
    },
    {
      actionName: 'confirmDestroy',
      icon: 'delete',
      color: '#e35e6b',
    }
  ];

  dataSource: TableDataSource = {} as TableDataSource;

  paging: Paging = {
    perPage: 3,
    currentPage: 1,
    items: 0,
    totalPages: 0
  };

  private customSwal;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.customSwal = Swal.mixin({
      customClass: {
        confirmButton: 'button-theme',
      },
    });
  }

  ngOnInit(): void {
    this.handleProducts();
  }

  changePage(paging: Paging): void {
    this.paging = paging;
    this.handleProducts()
  }

  handleProducts(): void {
    this.spinner.show();
    this.productService
      .find(this.paging)
      .subscribe({
        next: (response: any) => {
          this.dataSource.items  = response.products;
          this.dataSource.paging = response.paging;
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

  edit(product: Product) {
    const id = product.id;
    this.router.navigateByUrl(`products/update/${id}`)
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

  actionClick(event: EventEmitterTable) {
    const item = event.item;
    switch (event.action) {
      case 'edit':
        return this.edit(item);
      case 'destroy':
        return this.confirmDestroy(item);
      default:
        break;
    }
  }
}
