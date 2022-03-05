export class Stock {
  id!: number;
  quantity: number;
  quantityMin: number;

  constructor(quantity: number, quantityMin: number, id?: number) {
    if(id) this.id = id;

    this.quantity = quantity;
    this.quantityMin = quantityMin;
  }

  static fromAPI(data: any) {
    return new Stock(data.quantidade, data.quantidadeMinima, data.id);
  }

  static empty() {
    return new Stock(0, 0);
  }
}
