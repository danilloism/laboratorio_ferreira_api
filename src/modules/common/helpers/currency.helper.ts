import * as currency from 'currency.js';

export class CurrencyHelper {
  static readonly options = {
    fromCents: true as const,
    symbol: 'R$' as const,
    errorOnInvalid: true as const,
    decimal: ',' as const,
    separator: '.' as const,
  } as const;

  static createCurrencyInstance(value: number | currency) {
    return currency(value, this.options);
  }
}
