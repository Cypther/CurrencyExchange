import { AppConstants } from '../AppConstants/AppConstants';
import { CurrencyExchange } from '../models/CurrencyExchange';
import { FixerResponse } from '../models/FixerResponse';
import { Rates } from '../models/Rates';
import { Calculate } from './Calculate';

describe('Calculate', ()=>{

    it('Get CAN Tax Rate', ()=> {
        const result = Calculate.getCurrencyTax(AppConstants.CAD);
        expect(result).toBe(0.11);
    });

    it('Get USD Tax Rate', ()=> {
        const result = Calculate.getCurrencyTax(AppConstants.USD);
        expect(result).toBe(0.10);
    });

    it('Get EUR Tax Rate', ()=> {
        const result = Calculate.getCurrencyTax(AppConstants.EUR);
        expect(result).toBe(0.09);
    });

    let res: FixerResponse;
    let currencyExchange: CurrencyExchange;

    beforeEach(()=>{
        res = new FixerResponse();
        let rates = new Rates();

        rates.CAD = 1.564839;
        rates.USD = 1.187247;
        res.rates = rates;

        currencyExchange = new CurrencyExchange();
        currencyExchange.InvoiceDate = new Date();
    });

    it('Get CAN Currency Rate', ()=> {
        const result = Calculate.getCurrencyRate(AppConstants.CAD, res);
        expect(result).toBe(1.564839);
    });

    it('Get USD Currency Rate', ()=> {
        const result = Calculate.getCurrencyRate(AppConstants.USD, res);
        expect(result).toBe(1.187247);
    });

    it('Get EUR Currency Rate', ()=> {
        const result = Calculate.getCurrencyRate(AppConstants.EUR, res);
        expect(result).toBe(1.00);
    });

    it('USD test calculate Exchange Rate', ()=> {
        currencyExchange.EuroAmount = 123.45;
        currencyExchange.PaymentCurrencyType = AppConstants.USD;

        const result = Calculate.calculateExchangeRate(currencyExchange, res);
        expect(result.PreTaxAmount).toBe(146.57);
        expect(result.TaxAmount).toBe(14.66);
        //This Test failed; rounding error
        expect(result.GrandTotal).toBe(161.23);
        expect(result.ExchangeRate).toBe(1.187247);
    });

    it('EUR test calculate Exchange Rate', ()=> {
        currencyExchange.EuroAmount = 1000.00;
        currencyExchange.PaymentCurrencyType = AppConstants.EUR;

        const result = Calculate.calculateExchangeRate(currencyExchange, res);
        expect(result.PreTaxAmount).toBe(1000.00);
        expect(result.TaxAmount).toBe(90.00);
        expect(result.GrandTotal).toBe(1090.00);
        expect(result.ExchangeRate).toBe(1);
    });

    it('CAD test calculate Exchange Rate', ()=> {
        currencyExchange.EuroAmount = 6543.21;
        currencyExchange.PaymentCurrencyType = AppConstants.CAD;

        const result = Calculate.calculateExchangeRate(currencyExchange, res);
        expect(result.PreTaxAmount).toBe(10239.07);
        expect(result.TaxAmount).toBe(1126.30);
        expect(result.GrandTotal).toBe(11365.37);
        expect(result.ExchangeRate).toBe(1.564839);
    });

})
