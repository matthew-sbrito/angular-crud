import { Stock } from './stock';

export class Product {
  id!: number;
  name: string;
  price: number;
  stock: Stock;

  constructor(name: string, price: number, stock: Stock, id?: number) {
    if(id) this.id = id;

    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static fromAPI(data: any) {
    const stock = Stock.fromAPI(data.stock);
    return new Product(data.name, data.price, stock, data.id);
  }

  static streamList(data: any[]) {
    console.log(data)
    return data.map((product) => this.fromAPI(product));
  }

  static empty() {
    return new Product('', NaN, Stock.empty());
  }

  get quantity() {
    return this.stock.quantity;
  }
  get quantityMin() {
    return this.stock.quantityMin;
  }

  getBody(): any {
    return {
      id: this.id || null,
      name: this.name,
      price: this.price,
      quantity: this.stock.quantity,
      quantityMin: this.stock.quantityMin,
    }
  }
}
