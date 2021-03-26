import { AppConstants } from "../AppConstants/AppConstants";
import { CurrencyExchange } from "../models/CurrencyExchange";
import { CurrencyExchangeCalculated } from "../models/CurrencyExchangeCalculated";
import { FixerResponse } from "../models/FixerResponse";

export abstract class Calculate {


    public static calculateExchangeRate(currencyItem: CurrencyExchange, res: FixerResponse): CurrencyExchangeCalculated{

        let taxes = this.getCurrencyTax(currencyItem.PaymentCurrencyType);
        let ExchangeRate = this.getCurrencyRate(currencyItem.PaymentCurrencyType,res);
        let PreTaxAmount = currencyItem.EuroAmount * ExchangeRate;
        let TaxAmount = PreTaxAmount * taxes;
        let GrandTotal = PreTaxAmount + TaxAmount;
    
        let currencyExchangeCalculated = new CurrencyExchangeCalculated();
        currencyExchangeCalculated.InvoiceDate = currencyItem.InvoiceDate.toISOString().slice(0, 10);
        currencyExchangeCalculated.PreTaxAmount = this.roundCurrency(PreTaxAmount);
        currencyExchangeCalculated.TaxAmount = this.roundCurrency(TaxAmount);
        currencyExchangeCalculated.GrandTotal = this.roundCurrency(GrandTotal);
        currencyExchangeCalculated.ExchangeRate = ExchangeRate;
        return currencyExchangeCalculated;    
      }

      public static roundCurrency(value: number): number{
        return Math.round((value + Number.EPSILON) * 100) / 100;
      }
    
      public static getCurrencyRate(paymentCurrencyType: String, res: FixerResponse): number {
    
        switch (paymentCurrencyType) {
          case AppConstants.CAD:
            return res.rates.CAD;
          case AppConstants.USD:
            return res.rates.USD;
          case AppConstants.EUR:
              return AppConstants.EUR_EXCHANGE_RATE;
          default:
            console.log(`No Match!`);
            return AppConstants.DEFAULT_VALUE;
        }
      }
    
      public static getCurrencyTax(paymentCurrencyType: String): number {
    
        switch (paymentCurrencyType) {
          case AppConstants.CAD:
            return AppConstants.CAD_TAXES;
          case AppConstants.USD:
            return AppConstants.USD_TAXES;
          case AppConstants.EUR:
              return AppConstants.EUR_TAXES;
          default:
            console.log(`No Match!`);
            return AppConstants.DEFAULT_VALUE;
        }
      }

 }