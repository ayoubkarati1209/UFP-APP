import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {price_histories} from '../services/price_histories.bd'; 
import * as Highcharts from 'highcharts';
import * as am4charts from '@amcharts/amcharts4/charts';
declare var require: any;
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { spacglobal } from '../services/spacglobal.bd';
import {spacs} from '../services/spacs.bd';
import { spacspage } from '../services/spacspage.bd';
import { overview } from '../services/overview.bd';
import {ToastrService} from 'ngx-toastr';
import {trusts} from '../services/trust_datat_return.db';

const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
@Component({
  selector: 'app-modifyspac',
  templateUrl: './modifyspac.component.html',
  styleUrls: ['./modifyspac.component.scss']
})
export class ModifyspacComponent implements OnInit {
  private chart: am4charts.XYChart;
  variableName = [
    { 
      'status':false

    },
    {
       'status':true
    }]
   updateOptions: any;
   pricesResults:any;
 
 
   private oneDay = 24 * 3600 * 1000;
   private now: Date;
   private value: number ;
   private timer: any;
 
   lineChart: any;
   tutorials: any;
   currentTutorial = null;
   currentIndex = -1;
   title = '';
   news :any;
   truts : any;
   unitinfos: any;
   timelines:any;
   administrators:any;
   administratorsTypes:any;
   directors:any;
   shareholdersD:any;
   similarspacs:any;
   spacwithid:any;
   headElements = ['name', 'position', 'age', 'description'];
   headElementsth = ['Name', 'Position', 'Age', 'Summary'];
   headElementsShareH = ['Name', 'Shares', 'Title'];
   headElementsShareD = ['fund_name', 'shares', 'percentage'];
   timelinesth = ['date', 'type', 'title'];
   timelinesthdata = ['Date', 'Type', 'Title'];
   elementUnit='Unit information';
   elementUnitChart:any;
   drobdawUnit='Unit';
   chartUnit='Unit historical price';
   stocks:any;
   resarch:any;
   activate = false;
   warrants:any;
   public stockplusinfos = false;
   public showDesc = false;
   selectedIndex = -1;
   active: number;
   page = 1;
   count = 0;
   tableSize = 6;
   prices:any;
   pricearray=[];
   tableSizes = [3, 6, 9, 12];
   spacarray = [];  
   Run = [];
   days:any;
   arraypirce:any
   public options: any
   Linechart = [];  
   targetstatus:boolean;
   filins_link:boolean;
   allspacs:any
   spacsglobal:any
   ipo_date:any
   term_date:any
   w:any
   u:any
   Unit=[]
   Common=[]
   Warrant=[]
   overviews = {
    current_market_cap: '',
    monthly_admin_fees:'',
    ipo_lead_manager:'',
    intended_industry_focus:'',
    statuts:''
  
  };
  spacsfields={
name:'',
ticker:'',
cik:'',
filins_link:''
  }
  spac=[]
  trust_data_and_return_calculations={
    ipo_date:'',
    termination_date:'',
    original_length_comb_period:'',
    extendable:'',
    warrants_units_at_issuance:'',
    units_warrants:'',
    date_latest_filing:'',
    most_recent_cash_in_trust:''
      }
   constructor(@Inject(PLATFORM_ID) private platformId,private trust:trusts,private latestnews:spacs, private zone: NgZone,private activeID:ActivatedRoute,private Price_histories:price_histories,private spacs:spacglobal
     ,private spcs:spacs,private spa:spacspage,private spacglobal:spacglobal,private overview:overview,private toastr:ToastrService) { }
     browserOnly(f: () => void) {
       if (isPlatformBrowser(this.platformId)) {
         this.zone.runOutsideAngular(() => {
           f();
         });
       } 
     }
   spacId: string;
   ngOnInit(): void {
     this.spacId=this.activeID.snapshot.paramMap.get("id");
  this.getAllspacs()
  this.getSpacwithID()
  this.getRelatedresearch()
  this.getSpacs()
  this.getspacglobal()
   }
   showSuccess() {
    this.toastr.success('Les informations sons ajoutés avec succès !','succes');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
   getAllspacs() {
    this.spacs.getwhereid(this.spacId)
      .subscribe(
        data => {
          this.allspacs = data;
        },
        error => {
          console.log(error);
        });
  }
  savespac(){
    const data={
      name:this.spacsfields.name,
      ticker:this.spacsfields.ticker,
      cik:this.spacsfields.cik,
      filins_link:this.spacsfields.filins_link
    }
    this.spa.update(this.spacId,data).subscribe(
      response =>{
        console.log(response)
        if(data){
          this.showSuccess()
        }
      },error=>{
        this.showError()
        console.log(error)
      }
    )
  }
  saveTrust() {

    const data = {
      ipo_date:this.trust_data_and_return_calculations.ipo_date,
    termination_date:this.trust_data_and_return_calculations.termination_date,
    original_length_comb_period:this.trust_data_and_return_calculations.original_length_comb_period,
    extendable:this.trust_data_and_return_calculations.extendable,
    warrants_units_at_issuance:this.trust_data_and_return_calculations.warrants_units_at_issuance,
    units_warrants:this.trust_data_and_return_calculations.units_warrants,
    date_latest_filing:this.trust_data_and_return_calculations.date_latest_filing,
    most_recent_cash_in_trust:this.trust_data_and_return_calculations.most_recent_cash_in_trust
    
    };
    console.log(data)

    this.trust.update(this.spacId,data)
      .subscribe(
        response => {
          console.log(response);
          if(data)
         console.log('ok')
         this.showSuccess()
        },
        error => {
          this.showError()
          console.log(error);
        });
  }
  saveOver() {

    const data = {
      current_market_cap: this.overviews.current_market_cap,
      monthly_admin_fees:this.overviews.monthly_admin_fees,
      ipo_lead_manager:this.overviews.ipo_lead_manager,
      intended_industry_focus:this.overviews.intended_industry_focus,
    
    };
    console.log(data)

    this.overview.update(this.spacId,data)
      .subscribe(
        response => {
          console.log(response);
          if(data)
         console.log('ok')
         this.showSuccess()
        },
        error => {
          this.showError()
          console.log(error);
        });
  }
  newOver(){
    console.log("hello")
    this.saveOver();
    this.savespac()
  }
splitString(stringToSplit, separator) {
    const arrayOfStrings = stringToSplit.split(separator)
  this.w=arrayOfStrings[0]
  this.u=arrayOfStrings[1]
    console.log('The original string is: ', stringToSplit)
    console.log('The separator is: ', separator)
    console.log(arrayOfStrings[0])
    console.log('The array has ', arrayOfStrings.length, ' elements: ', arrayOfStrings.join(' / '))
  }
  getspacglobal(){
  
    this.spacglobal.getspacsglobal(this.spacId).subscribe(data=>{
      this.spacsglobal=data
      
      for(let s of this.spacsglobal){
        this.spac.push({idspac:s.idspac,name:s.name,ticker:s.ticker,cik:s.cik,filins_link:s.filins_link,})
        let index = this.spacsglobal.findIndex(x => x.idspac ===s.idspac);
        for(let u of s.unit_informations){
          this.Unit.push({idunit:u.idunit,ticker:u.ticker,last_price:u.last_price,ipo_price:u.ipo_price,ipo_date:u.ipo_date,ipo_issuance:u.ipo_issuance,thirty_day_adv:u.thirty_day_adv,fk_spac:u.fk_spac})
        }
        for(let c of s.common_stock_infos){
          this.Common.push({idcommon:c.idcommon,ticker:c.ticker,last_price:c.last_price,ipo_price:c.ipo_price,ipo_date:c.ipo_date,ipo_issuance:c.ipo_issuance,thirty_day_adv:c.thirty_day_adv,fk_spac:c.fk_spac})
        }
        for(let w of s.warrant_informations){
          this.Warrant.push({idwarrant:w.idwarrant,ticker:w.ticker,last_price:w.last_price,ipo_price:w.ipo_price,ipo_date:w.ipo_date,ipo_issuance:w.ipo_issuance,thirty_day_adv:w.thirty_day_adv,strike_price:w.strike_price,underlying_multiplier:w.underlying_multiplier,underlying_security:w.underlying_security,first_exrcise_date:w.first_exrcise_date,expiration:w.expiration,delta:w.delta,implied_volatility:w.implied_volatility,fk_spac:w.fk_spac})
        }
        for(let o of s.overviews){
          this.overviews.current_market_cap=o.current_market_cap
          this.overviews.intended_industry_focus=o.intended_industry_focus
          this.overviews.ipo_lead_manager=o.ipo_lead_manager
          this.overviews.monthly_admin_fees=o.monthly_admin_fees
          this.overviews.statuts=o.statuts
          this.spacarray.push({idoverview:o.idoverview,current_market_cap:o.current_market_cap,monthly_admin_fees:o.monthly_admin_fees,ipo_lead_manager:o.ipo_lead_manager,intended_industry_focus:o.intended_industry_focus,filins_link:s.filins_link,statuts:o.statuts,ipo_date:"",term_date:"",original_length_comb_period:"",extendable:"",warrants_units_at_issuance:"",date_latest_filing:"",most_recent_cash_in_trust:"",most_recent_shares_outsanding:"",most_recent_cash_in_trust_per_share:"",estimated_monthly_accretion:"",estimated_cash_at_termination:"",return_to_termination:"",annualized_return_termination:"",warrant:"",unit:""})
        }
        for(let t of s.trust_data_and_return_calculations){
          this.spacarray[index].ipo_date=t.ipo_date
          this.spacarray[index].term_date=t.termination_date
          this.spacarray[index].original_length_comb_period=t.original_length_comb_period
          this.spacarray[index].warrants_units_at_issuance=t.warrants_units_at_issuance
          this.splitString(t.warrants_units_at_issuance,'/')
          this.spacarray[index].warrant=this.w
          this.spacarray[index].unit=this.u
          this.spacarray[index].extendable=t.extendable
          this.spacarray[index].date_latest_filing=t.date_latest_filing
          this.spacarray[index].most_recent_cash_in_trust=t.most_recent_cash_in_trust
          this.spacarray[index].most_recent_shares_outsanding=t.most_recent_shares_outsanding
          this.spacarray[index].most_recent_cash_in_trust_per_share=t.most_recent_cash_in_trust_per_share
          this.spacarray[index].estimated_monthly_accretion=t.estimated_monthly_accretion
          this.spacarray[index].estimated_cash_at_termination=t.estimated_cash_at_termination
          this.spacarray[index].return_to_termination=t.return_to_termination
          this.spacarray[index].annualized_return_termination=t.annualized_return_termination           
          console.log(t.ipo_date)
         console.log(index)
        }
        console.log(this.spacarray)
        console.log(this.Unit)
      }
     
    })
  }
  LatestNews() {
    this.latestnews.getAll()
      .subscribe(
        data => {
          this.news = data;
        
        },
        error => {
         
        });
  }
  getSpacwithID() {
    this.spa.get(this.spacId)
      .subscribe(
        data => {
          this.spacwithid = data;
       if(this.spacwithid.filins_link=='#NAME?'){
        this.filins_link=false
       }else{
this.filins_link=true
       }
          
        },
        error => {
      
          
        });
  }
  getRelatedresearch() {
    this.latestnews.getLimit().subscribe(
      data =>{
this.resarch=data;
      },
      error => {
        console.log(error);
      });
  }
  getSpacs() {
    this.spa.getLimit()
      .subscribe(
        data => {
          this.similarspacs = data;
        },
        error => {
        
        });
  }
 }