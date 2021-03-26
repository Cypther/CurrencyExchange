import { Rates } from "./Rates";

export class FixerResponse {
    success!:boolean;
    timestamp!:Number;
    historical!:boolean;
    base!:String;
    date!:Date;
    rates!:Rates;
  }