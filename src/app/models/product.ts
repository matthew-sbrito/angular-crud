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

  getBody(): any {
    return {
      id: this.id || null,
      nome: this.name,
      preco: this.price,
      quantidade: this.stock.quantity,
      quantidadeMinima: this.stock.quantityMin,
    }
  }
}
