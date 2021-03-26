import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyExchangeCalculated } from 'src/shared/models/CurrencyExchangeCalculated';

@Component({
  selector: 'app-currency-item-card',
  templateUrl: './currency-item-card.component.html',
  styleUrls: ['./currency-item-card.component.css']
})
export class CurrencyItemCardComponent implements OnInit {

  @Input() currencyExchangeCalculatedItem: CurrencyExchangeCalculated = new CurrencyExchangeCalculated();
  @Output() removeButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeCard(): void {
    this.removeButtonClick.emit();
  }

}
