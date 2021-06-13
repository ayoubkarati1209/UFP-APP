import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import {spacglobal} from '../services/spacglobal.bd';

@Component({
  selector: 'app-spacdatable',
  templateUrl: './spacdatable.component.html',
  styleUrls: ['./spacdatable.component.scss']
})
export class SpacdatableComponent implements OnInit , AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Company', 'ticker', 'intended_industry_focus', 'current_market_cap','last_price','Combination_Announced' ,'target','termination_date'];
  spacsall: any = [];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(private cdRef: ChangeDetectorRef,private spacglobal:spacglobal) {}

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  calculateDiff(dateSent){
    let currentDa = new Date();
    dateSent = new Date(dateSent);
 
     let days= Math.floor((Date.UTC(currentDa.getFullYear(), currentDa.getMonth(), currentDa.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
     if(days>=30){
      return Math.floor(days/30) + " month"
     }else{
       return days + " day"
     }
  
   }
  ngOnInit():void{
    this.spacglobal.getAlllimit100()
    .subscribe(
      data => {
        this.spacsall = data;
        for(let d of this.spacsall) {
          this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:""})

          let index = this.elements.findIndex(x => x.idspac ===d.idspac);

          for(let o of d.overviews){
            if(o){
              this.elements[index].intended_industry_focus=o.intended_industry_focus
              this.elements[index].current_market_cap=o.current_market_cap
              this.elements[index].target=o.target
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:""})
            }
          }
          for(let u of d.unit_informations){
            if(u){
              this.elements[index].last_price=u.last_price
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:""})
            }
          }
          for(let t of d.trust_data_and_return_calculations){
            if(t){
              this.elements[index].termination_date=this.calculateDiff(t.termination_date)
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:""})
            }
          }
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
        
      },
      error => {
        
      });


  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
 
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
    
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {

    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

}
