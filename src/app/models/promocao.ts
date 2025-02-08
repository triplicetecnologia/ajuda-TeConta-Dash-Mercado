export class Promocao {
    constructor(
      public titulo: string,
      public descricao: string,
      public preco: number,
      public supermercado: string,
      public data: Date
    ) {}
  
    formatarPreco(): string {
      return `R$ ${this.preco.toFixed(2)}`;
    }
  }