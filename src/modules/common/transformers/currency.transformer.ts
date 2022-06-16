import currency from 'currency.js';
import { CurrencyHelper } from '../helpers/currency.helper';

export class CurrencyTransformer {
  public readonly from = (value: number) =>
    currency(value, CurrencyHelper.options);
  public readonly to = (value: currency) => value.cents();
}
