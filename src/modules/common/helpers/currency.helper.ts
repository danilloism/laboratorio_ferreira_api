import currency from 'currency.js';
import { CurrencyTransformer } from '../transformers/currency.transformer';

export class CurrencyHelper {
  static readonly options = {
    fromCents: true as const,
    symbol: 'R$' as const,
    errorOnInvalid: true as const,
    decimal: ',' as const,
    separator: '.' as const,
  };

  static readonly entityTransformer = new CurrencyTransformer();

  static createCurrencyInstance(value: number | currency) {
    return currency(value, this.options);
  }
}
