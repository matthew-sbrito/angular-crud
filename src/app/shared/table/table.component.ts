import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionTable, TableDataSource, DisplayedColumn, EventEmitterTable, Paging} from "./table.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() listPerPage: number[] = [5, 10, 15];
  @Input() columns: DisplayedColumn[] = [];
  @Input() actions: ActionTable[] = [];
  @Input() dataSource: TableDataSource = {} as TableDataSource;

  @Output() actionClick: EventEmitter<EventEmitterTable> = new EventEmitter<EventEmitterTable>();
  @Output() alterPage:   EventEmitter<Paging> = new EventEmitter<Paging>();

  showColumns: DisplayedColumn[] = [];
  displayedColumns: string[] = ['id'];

  constructor() { }

  ngOnInit(): void {
    // this.displayedColumns = this.columns.map( column => column.columnDef );
    this.showColumns = this.columns.filter( column => column.columnDef != 'action');

    if(this.actions.length) {
      // this.displayedColumns.push('action');
    }
  }

  get headerText(): string {
    const columns = this.showColumns.map( column => column.label )
    return columns.join(' | ');
  }
  get paging(): Paging {
    return this.dataSource.paging;
  }
  get perPage() {
    return this.paging.perPage;
  }
  set perPage(page: number) {
    this.paging.perPage = page;
  }
  get currentPage() {
    return this.paging.currentPage;
  }
  set currentPage(page: number) {
    this.paging.currentPage = page;
  }
  page(page: string): void {
    const next = this.getNextPage(page);

    const greaterThanTotalPages = next > this.paging.totalPages;
    const lessThanOne = next < 1;
    const equalsCurrent = next == this.currentPage;

    if(greaterThanTotalPages || lessThanOne ||  equalsCurrent) return;

    this.paging.currentPage = next;
    this.alterPage.emit(this.paging)
  }

  changePerPage(): void {
    this.alterPage.emit(this.paging)
  }

  eventClick(item: any, action: string): void {
   this.actionClick.emit({
     action,
     item
   });
  }

  private getNextPage(page: string): number {
    const current = this.currentPage;
    switch (page) {
      case 'next':
        return current + 1;
      case 'previous':
        return current - 1;
      case 'last':
        return this.paging.totalPages;
      default:
        return 1;
    }
  }
}
