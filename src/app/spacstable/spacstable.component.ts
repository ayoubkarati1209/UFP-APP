import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {allinfos} from '../services/alltable.bd';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { FixedScaleAxis } from 'chartist';
import { NgbDate, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {spacs} from '../services/spacs.bd'; 
import {spacglobal} from '../services/spacglobal.bd';
import {spacspage} from '../services/spacspage.bd';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-spacstable',
  templateUrl: './spacstable.component.html',
  styleUrls: ['./spacstable.component.scss'],
  providers: [DatePipe]
})
@Pipe({
  name: 'tableFilter'
})
export class SpacstableComponent implements OnInit,PipeTransform {
  target: string;

  keyword = 'name';
  collection: any;
  p: number;
  itemsPerPage = 10;
  totalItems: any;
  allspacs:any=[];
  overs:any=[];
  trusts:any=[];
  ipo_date:any;
  elements: any = [];
  markets:any=[];
  spacssearch:any;
  headElements = ['ID','Company', 'ticker', 'intended_industry_focus', 'current_market_cap','last_price','Combination_Announced' ,'target','termination_date'];
  headThs = ['id','Company', 'Ticker', 'Industry focus', ' Market cap in $mm',' Last price ( in $)','Combination announced ?' ,'Target','Remaining life'];
  constructor(private datePipe:DatePipe,public allinfos:allinfos, private http: HttpClient) {}



  ngOnInit(): void {
    this.getAllData();
    this.getAllSpac();
  }
  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.target === value) : list;
  }                               
                                         
  selectEvent(item){
    
  }  
  
  onchangeSearch(search: string){

  }

  onFocused(e){

  }
                                    
  HomeResearch():void{
  }
  getAllData() {
    const url = `http://54.205.210.47:8050/api/spacs/page?page=${0}&size=${this.itemsPerPage}`;
  this.http.get(url).subscribe((data: any) => {
    this.totalItems = data.totalItems;
    this.allspacs=data
        for(let d of this.allspacs.admin_detail) {
          this.elements.push({idspac:d.id,Company:d.name,ticker:"",intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
          let index = this.elements.findIndex(x => x.idspac ===d.id);
          this.elements[index].ticker=d.tickers[0]?.unit_ticker
          this.allinfos.getovers(this.elements[index].idspac).subscribe(datas=>{
            this.overs=datas;
            this.elements[index].current_market_cap=this.overs?.market_cap
            this.elements[index].intended_industry_focus=this.overs?.industry?.name
            this.elements[index].statuts=this.overs?.status
            this.elements[index].target=this.overs?.target?.name
          },error=>{
            console.log(error);
          }
          )
          this.allinfos.gettrusts(this.elements[index].idspac).subscribe(data=>{
            this.trusts=data;
            this.ipo_date=this.datePipe.transform(this.trusts?.ipo_date, 'MM');
            this.elements[index].termination_date=Number(this.ipo_date)+Number(this.trusts?.combination_months)
          },error=>{
            console.log(error);
          })
          this.allinfos.getmarkets(this.elements[index].idspac).subscribe(data=>{
            this.markets=data;
            this.elements[index].last_price=this.markets?.price
          },error=>{
            console.log(error);
          })
        }
  })
}

getPage(page) {
  page=page-1; 
  const url = `http://54.205.210.47:8050/api/spacs/page?page=${page}&size=${this.itemsPerPage}`;
  this.http.get(url).subscribe((data: any) => {
    this.elements.length=0;
    this.totalItems = data.totalItems;
    this.allspacs=data
    for(let d of this.allspacs.admin_detail) {
      this.elements.push({idspac:d.id,Company:d.name,ticker:"",intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
      let index = this.elements.findIndex(x => x.idspac ===d.id);
      this.elements[index].ticker=d.tickers[0]?.unit_ticker
      this.allinfos.getovers(this.elements[index].idspac).subscribe(datas=>{
        this.overs=datas;
        this.elements[index].current_market_cap=this.overs?.market_cap
        this.elements[index].intended_industry_focus=this.overs?.industry?.name
        this.elements[index].statuts=this.overs?.status
        this.elements[index].target=this.overs?.target?.name
      },error=>{
        console.log(error);
      }
      )
      this.allinfos.gettrusts(this.elements[index].idspac).subscribe(data=>{
        this.trusts=data;
        this.ipo_date=this.datePipe.transform(this.trusts?.ipo_date, 'MM');
        this.elements[index].termination_date=Number(this.ipo_date)+Number(this.trusts?.combination_months)
      },error=>{
        console.log(error);
      })
      this.allinfos.getmarkets(this.elements[index].idspac).subscribe(data=>{
        this.markets=data;
        this.elements[index].last_price=this.markets?.price
      },error=>{
        console.log(error);
      })
    }
  })
}
getAllSpac() {
  this.allinfos.getSpacs()
    .subscribe(
      data => {
        this.spacssearch=data;
      },
      error => {
      });
}
}
