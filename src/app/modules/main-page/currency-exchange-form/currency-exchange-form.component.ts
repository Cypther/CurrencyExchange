import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CurrencyExchange } from 'src/shared/models/CurrencyExchange';

@Component({
  selector: 'app-currency-exchange-form',
  templateUrl: './currency-exchange-form.component.html',
  styleUrls: ['./currency-exchange-form.component.css']
})
export class CurrencyExchangeFormComponent implements OnInit {

  /*
    Number: Currency amount US & EU (cents optional) Can use US-style 123,456.78 notation and European-style 123.456,78 notation. 
    Optional thousands separators; optional two-digit fraction
  */
  static readonly CurrencyRegex = '^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$';
  static readonly DateRegex = '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';

  paymentCurrencyTypes: string[] = ['CAD','USD','EUR'];

  minDate: Date;
  maxDate: Date;

  currencyExchangeForm!: FormGroup;

  @Output() formSubmit: EventEmitter<CurrencyExchange> = new EventEmitter<CurrencyExchange>();

  constructor(private formbuilder: FormBuilder) { 
                // Set the minimum to January 1st 20 years in the past and Mex Today's date.
                // Since we don't know the currecncy exchange in the future
                const currentYear = new Date().getFullYear();
                this.minDate = new Date(currentYear - 20, 0, 1);
                this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.initializeForm();
  }



  initializeForm(): void{
    this.currencyExchangeForm = this.formbuilder.group({
      InvoiceDate: ['', Validators.required],
      EuroAmount: ['', [Validators.required, Validators.pattern(CurrencyExchangeFormComponent.CurrencyRegex)]],
      PaymentCurrencyType: ['', Validators.required]
    });
  }

  onSubmit(formValue: CurrencyExchange, formDirective: FormGroupDirective): void{
    console.log(formValue);
    this.formSubmit.emit(formValue);

    //reset the form and directives
    formDirective.resetForm();
    this.currencyExchangeForm.reset();
  }

}
