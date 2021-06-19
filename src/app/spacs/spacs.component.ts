import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {spacspage} from '../services/spacspage.bd';
import { NgbDate, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import {spacglobal} from '../services/spacglobal.bd';
import {allinfos} from '../services/alltable.bd';
import { Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";  
import { Spinkit } from 'ng-http-loader'; // <============
import { SpinnerVisibilityService } from 'ng-http-loader';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { KeycloakProfile } from 'keycloak-js';
import {KeycloakService } from 'keycloak-angular'; 
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-spacs',
  templateUrl: './spacs.component.html',
  styleUrls: ['./spacs.component.scss'],
  providers: [DatePipe]
})
@Pipe({
  name: 'tableFilter'
})
export class SpacsComponent implements OnInit,PipeTransform{
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  public isLoggedIn = false;
  admin:boolean=false
  transform(list: any[], value: string) {
    return value ? list.filter(item => item.target) : list;
  }
  public spinkit = Spinkit;
  elements: any = [];
  elementsts: any = [];
  headElements = ['Company', 'ticker', 'intended_industry_focus', 'current_market_cap','last_price','Combination_Announced' ,'target','termination_date'];
  headThs = ['Company', 'Ticker', 'Industry focus', ' Market cap in $mm',' Last price ( in $)','Combination announced ?' ,'Target','Remaining life'];
  elementstarget: any = [];
  elementsnotarget: any = [];
  spacsall: any = [];
  spacss: any = [];
  target:string;
  searchText: string = '';
  previous: string;
  page = 1;
  targ:boolean=false;
  notarg:boolean=false;
  all:boolean=true;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  maxVisibleItems: number = 10;
  spacsearch:any=[];
  index=0;
  index1=0;
  user:firebase.User;
  targetyes:boolean=false;
  isLoading: boolean;
  arraysort=[];
  ipo_date:any
  allspacs:any=[];
  targets:any;
  public userProfile: KeycloakProfile | null = null;
  constructor(private datePipe:DatePipe,private allinfos:allinfos,private auth:AuthenticationService,private keycloackService:KeycloakService,private cdRef: ChangeDetectorRef,private spacglobal:spacglobal,private SpinnerService: NgxSpinnerService,public afAuth: AngularFireAuth,public loadingBar: LoadingBarService) {
    afAuth.authState.subscribe(auth => {
      if(auth) {
      } else {
      }
    });
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  calculateDiff(dateSent){
    let currentDa = new  Date();
    dateSent = new Date(dateSent);
 
     let days= Math.floor((Date.UTC(currentDa.getFullYear(), currentDa.getMonth(), currentDa.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
     if(days>=30){
      return Math.floor(days/30) + " month"
     }else{
       return days + " day"
     }
  
   }
   public async ngOnInit(){
    this.auth.getUserState().subscribe(
      user=>{
        this.user=user;
        if(user.email=='hello@dba.com'){
          this.admin=true;
        }
      }
    )
   this.getspacs()
  }
  getspacs(){
    this.allinfos.getAllspacs().subscribe(
      data=>{
        this.allspacs=data
        for(let d of this.allspacs) {
          this.elements.push({idspac:d.id,Company:d.name,ticker:"",intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
          let index = this.elements.findIndex(x => x.idspac ===d.id);

          for(let o of d.overviews){
            if(o){
              this.elements[index].current_market_cap=o.market_cap
              this.elements[index].intended_industry_focus=o.industry.name
              this.elements[index].statuts=o.status
              this.allinfos.gettargets(o.id).subscribe(
                datas=>{
                  this.targets=datas;
                  if(datas)
                  {
                    this.elements[index].target=this.targets.name

                  }
                },error=>{

                }
              );
            }
          }
          for(let m of d.markets){
            if(m){
              if(m.type_id===1){
              this.elements[index].last_price=m.price
              }
            }
          }
          for(let t of d.trusts){
            if(t){
              this.ipo_date=t.ipo_date
              this.ipo_date=this.datePipe.transform(this.ipo_date, 'MM');
              this.ipo_date=Number(this.ipo_date)+Number(t.combination_months)
              this.elements[index].termination_date=this.ipo_date
            }
          }
          for(let ti of d.tickers){
            if(ti){
              this.elements[index].ticker=ti.unit_ticker
            }
          }
        }
        console.log(this.elements);
        this.mdbTable.setDataSource(this.elements);
          this.allspacs = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
      },error=>{
        console.log(error);
      }
    )
  }
  initial(){
    this.spacglobal.getAlllimit100()
    .subscribe(
      data => {
        this.spacsall = data;
        for(let d of this.spacsall) {
          this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})

          let index = this.elements.findIndex(x => x.idspac ===d.idspac);

          for(let o of d.overviews){
            if(o){
              this.elements[index].intended_industry_focus=o.intended_industry_focus
              this.elements[index].current_market_cap=o.current_market_cap
              this.elements[index].target=o.target
              this.elements[index].statuts=o.statuts
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
            }
          }
          for(let u of d.unit_informations){
            if(u){
              this.elements[index].last_price=u.last_price
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
            }
          }
          for(let t of d.trust_data_and_return_calculations){
            if(t){
              this.elements[index].termination_date=this.calculateDiff(t.ipo_date)
            }
            else{
              this.elements.push({idspac:d.idspac,Company:d.Company,ticker:d.ticker,intended_industry_focus:"",current_market_cap:"",last_price:"",target:"",termination_date:"",statuts:""})
            }
          }
          this.arraysort=this.elements.sort((a,b) => a.Company > b.Company ? 1 : -1)

          this.elementsts=this.arraysort
          this.mdbTable.setDataSource(this.elementsts);
          this.elementsts = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
        
      },
      error => {
        
      });

  }
  Target(){
    this.isLoading = true;
    this.targ=true;
    this.notarg=false;
this.targetyes=true;
if(this.index==0){
  this.index1=0
  this.elementstarget=[];
      this.spacglobal.getAlllimit100()
      .subscribe(
        data => {
          this.spacsall = data;
          for(let d of this.spacsall) {
            let index = this.elements.findIndex(x => x.idspac ===d.idspac);
          if(this.elements[index].target){
            this.elementstarget.push({idspac:this.elements[index].idspac,Company:this.elements[index].Company,ticker:this.elements[index].ticker,intended_industry_focus:this.elements[index].intended_industry_focus,current_market_cap:this.elements[index].current_market_cap,last_price:this.elements[index].last_price,target:this.elements[index].target,termination_date:this.elements[index].termination_date})
          }
        }
        this.elementsts=this.elementstarget
        this.mdbTable.setDataSource(this.elementstarget);
          this.elementstarget = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      )
      }
    this.index=this.index+1;
  }
  NoTarget(){
    this.notarg=true;
    this.targ=false;
    if(this.index1==0){
      this.index=0
      this.elementsnotarget=[];
      this.spacglobal.getAlllimit100()
      .subscribe(
        data => {
          this.spacsall = data;
          for(let d of this.spacsall) {
            let index = this.elements.findIndex(x => x.idspac ===d.idspac);
          if(!this.elements[index].target){
            this.elementsnotarget.push({idspac:this.elements[index].idspac,Company:this.elements[index].Company,ticker:this.elements[index].ticker,intended_industry_focus:this.elements[index].intended_industry_focus,current_market_cap:this.elements[index].current_market_cap,last_price:this.elements[index].last_price,target:this.elements[index].target,termination_date:this.elements[index].termination_date})
          }
        }
        this.elementsts=this.elementsnotarget
        this.mdbTable.setDataSource(this.elementsnotarget);
          this.elementsnotarget = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      )
      }
      this.index1=this.index1+1;

  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.tableSize);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  onTableDataChange(event){
    this.page = event;
    this.mdbTable.setDataSource(this.allspacs);
          this.allspacs = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
  }
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.mdbTable.setDataSource(this.allspacs);
    this.allspacs = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
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
