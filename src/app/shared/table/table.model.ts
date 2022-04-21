export interface TableDataSource {
  paging: Paging;
  items: any[]
}

export interface EventEmitterTable{
  action: string;
  item: any;
}

export interface  ActionTable {
  actionName: string,
  icon: string;
  color?: string;
}

export interface DisplayedColumn {
  columnDef: string;
  label: string;
}

export interface Paging {
  currentPage: number;
  items: number;
  totalPages: number;
  perPage: number;
}
