import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyExchangeCalculated } from 'src/shared/models/CurrencyExchangeCalculated';

@Component({
  selector: 'app-currency-item-list',
  templateUrl: './currency-item-list.component.html',
  styleUrls: ['./currency-item-list.component.css']
})
export class CurrencyItemListComponent implements OnInit {

  @Input() currencyExchangeCalculatedItemList!: CurrencyExchangeCalculated[];
  @Output() delete: EventEmitter<CurrencyExchangeCalculated> = new EventEmitter<CurrencyExchangeCalculated>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(card: CurrencyExchangeCalculated){
    this.delete.emit(card);
  }

}
