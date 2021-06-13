export class CorporateEmployee {
    Company: string;
    Ticker: string;
    Industry_focus: string;
    Market_Cap: number;
    Last_price: string;
    Combination: string;
    Target: string;
    Remaining_life: string;
    constructor(Company: string, Ticker: string, Industry_focus: string, Market_Cap: number,
        Last_price: string,Combination: string,Target: string,Remaining_life:string) {
      this.Company = Company;
      this.Ticker = Ticker;
      this.Industry_focus = Industry_focus;
      this.Market_Cap= Market_Cap;
      this.Last_price = Last_price;
      this.Combination = Combination;
      this.Target = Target;
      this.Remaining_life = Remaining_life;
    }
  }