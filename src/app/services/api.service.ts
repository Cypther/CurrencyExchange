import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FixerResponse } from 'src/shared/models/FixerResponse';
import { AppSettings } from 'src/shared/AppSettings/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCurrencyExchangeRateByDate(date: Date){
    let dateString = date.toISOString().slice(0, 10);
    return this.http.get<FixerResponse>(AppSettings.FIXER_IO_API_ENDPOINT + dateString + '?access_key='+ AppSettings.FIXER_IO_API_KEY +'&base=EUR&symbols=USD,CAD');
  }

}
