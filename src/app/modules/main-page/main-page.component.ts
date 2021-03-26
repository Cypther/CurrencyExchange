import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Calculate } from 'src/shared/Helpers/Calculate';
import { CurrencyExchange } from 'src/shared/models/CurrencyExchange';
import { CurrencyExchangeCalculated } from 'src/shared/models/CurrencyExchangeCalculated';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  currencyExchangeCalculatedItemList: CurrencyExchangeCalculated[] = new Array<CurrencyExchangeCalculated>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }

  processExchangeRate(currencyItem: CurrencyExchange){ 
    
    this.api.getCurrencyExchangeRateByDate(currencyItem.InvoiceDate).subscribe(res => {

      if(res.success){

        let currencyExchangeCalculated = Calculate.calculateExchangeRate(currencyItem, res);
        this.currencyExchangeCalculatedItemList.push(currencyExchangeCalculated);

      }else{
        console.log(`API Call failed!`);
      }
    });
  }

  deleteItem(card: CurrencyExchangeCalculated){
      let index = this.currencyExchangeCalculatedItemList.indexOf(card);
      this.currencyExchangeCalculatedItemList.splice(index, 1);
  }
}
