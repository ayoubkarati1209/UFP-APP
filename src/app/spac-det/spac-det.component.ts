import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {overview} from '../services/overview.bd';
import {spacs} from '../services/spacs.bd';
import {trusts} from '../services/trust_datat_return.db';
import {units} from '../services/unit_informations.db';
import {filings} from '../services/filings_timelines.bd';
import {admins} from '../services/administrativ.bd';
import {adminsDet} from '../services/admin_details.bd';
import {directors} from '../services/admins_officers.bd';
import {groupBy} from 'lodash-es';
import {shareholders} from '../services/shareholders.bd';
import {spacspage} from '../services/spacspage.bd';
import {stock} from '../services/commonstock.bd';
import {warrant} from '../services/warrentinformation.bd';
import {price_histories} from '../services/price_histories.bd'; 
import { Chart } from 'chart.js';
import * as CanvasJS from 'canvasjs';
import { EChartsOption } from 'echarts';
import * as Highcharts from 'highcharts';
import * as cdata from './data';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from "@amcharts/amcharts4/themes/material";

declare var require: any;
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-spac-det',
  templateUrl: './spac-det.component.html',
  styleUrls: ['./spac-det.component.scss']
})
export class SpacDetComponent implements OnInit,OnDestroy {
  private chart: am4charts.XYChart;
 public data= cdata.TimeChartData;
 
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
  Player = [];  
  Run = [];  
  days:any;
  arraypirce:any
  public options: any
  Linechart = [];  
  targetstatus:boolean;
  filins_link:boolean;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private activeID:ActivatedRoute,private tutorialService: overview,private latestnews:spacs,private trust:trusts,private unit:units,
    private filing:filings,private admins:admins,private admin_details:adminsDet,private directors_officiers:directors,private shareholdersa:shareholders,private spacs:spacspage,
    private stock:stock,private warrant:warrant, private Price_histories:price_histories
    ) { }
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
 
    this.Price_histories.getAllWhere(this.spacId).subscribe(
      data => {
        this.prices=data
        console.log(this.prices)
        for(let d of this.prices.price_history){
          this.days=new Date(d.date)
      this.pricearray.push([this.days.getTime(),d.price])
        }
        this.options = {
          chart: {
             zoomType: 'x',
          },
          title: {
              text: ''
          },
          subtitle: {
              text: document.ontouchstart === undefined ?
                  '' : ''
          },
          credits: {
            enabled: false
        },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              title: {
                  text: ''
              }
          },
          legend: {
              enabled: false
          },
          plotOptions: {
                      area: {
                          fillColor: {
                              linearGradient: {
                                  x1: 0,
                                  y1: 0,
                                  x2: 0,
                                  y2: 1
                              },
                              stops: [
                                  [0, Highcharts.getOptions().colors[0]],
                                  [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                              ]
                          },
                          marker: {
                              radius: 2
                          },
                          lineWidth: 1,
                          states: {
                              hover: {
                                  lineWidth: 1
                              }
                          },
                          threshold: null
                      }
                  },
          series: [{
                      type: 'area',
                      name: 'Price',
                      data: this.pricearray
                  }]
        }
        Highcharts.chart('container', this.options);
        console.log(this.pricearray)
    },
    error =>{
      console.log(error)
    }
    
    );
    this.retrieveTutorials();
    this.LatestNews();
    this.getTruts();
    this.lineChartMethod();
    this.getUnits();
    this.getfilings();
    this.getAdmins();
    this.getAdminsDet();
    this.getD_officiers();
    this.getshareholders();
    this.getSpacs();
    this.getSpacwithID();
    this.getCommonStock();
    this.getWarrant();
    this.getRelatedresearch();
    this.getAllpriceHistoires();
  }

  

  getAllpriceHistoires() {
    this.Price_histories.getAll()
      .subscribe(
        data => {
          this.pricesResults = data;
          if(this.pricesResults)
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  ngOnDestroy() {
    clearInterval(this.timer);
  }
  addclassdesc():void{
    console.log("hello");
    if(this.showDesc){
      document.querySelector('#desc').classList.add('displaydesctiption');
    }else{
    document.querySelector('#desc').classList.remove('displaydesctiption');
    }
  }
  onTableDataChange(event){
    this.page = event;
    this.getfilings();
  }
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getfilings();
  }   
  getStock(){
    this.unitinfos=this.stocks;
    this.elementUnit='Common stock';
    this.drobdawUnit=this.elementUnit;
    this.stockplusinfos=false;
    this.chartUnit='Unit historical price';
   
  }
  getWarrent():void{
    this.chartUnit='Unit historical price';
    this.unitinfos=this.warrants;
    this.elementUnit='Warrant information';
    this.drobdawUnit=this.elementUnit;
    this.stockplusinfos=true;

   
  }
  getUnit():void{
    this.elementUnit='Unit information';
    this.drobdawUnit='Unit';
    this.stockplusinfos=false;
    this.chartUnit='Unit historical price';
    this.getUnits();
  }
  getWarrant() {
    this.warrant.get(this.spacId)
      .subscribe(
        data => {
          this.warrants = data;
       
        },
        error => {
         
        });
  }
  getCommonStock() {
    this.stock.get(this.spacId)
      .subscribe(
        data => {
          this.stocks = data;
          
        },
        error => {
         
        });
  }
  getRelatedresearch() {
    this.latestnews.getLimit().subscribe(
      data =>{
this.resarch=data;
console.log(this.resarch);
      },
      error => {
        console.log(error);
      });
  }
  retrieveTutorials() {
    this.tutorialService.get(this.spacId)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data)
          if(this.tutorials.statuts=='true'){
            this.targetstatus=true
            console.log(this.tutorials.statuts)
          }else{
            this.targetstatus=false
            console.log(this.tutorials.statuts)
          }
        },
        error => {
     
        });
  }
  getAdmins() {
    this.admins.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.administrators = data;
          if(this.administrators)
          this.admin_details.get(this.administrators.idadmin)
      .subscribe(
        data => {
          const states = groupBy(data, 'type');
          const typas=Object.entries(states).map(([type, value]) => ({type, value}));
          this.administratorsTypes = typas;
      console.log(this.administratorsTypes);
          
        },
        error => {
        
        });
          console.log(this.administrators);
        },
        error => {
         
          
        });
  }
  getSpacs() {
    this.spacs.getLimit()
      .subscribe(
        data => {
          this.similarspacs = data;
        
        },
        error => {
        
        });
  }
  getSpacwithID() {
    this.spacs.get(this.spacId)
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
  getshareholders() {
    this.shareholdersa.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.shareholdersD = data;
        
          
        },
        error => {
       
        });
  }
  getAdminsDet() {
   
  }
  getD_officiers() {
    this.directors_officiers.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.directors = data;
       
        },
        error => {
         
        });
  }
  getfilings() {
    this.filing.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.timelines = data;
        },
        error => {
          
        });
  }
  getUnits() {
    this.unit.get(this.spacId)
      .subscribe(
        data => {
          this.unitinfos = data;
         
         
        },
        error => {
         
        });
  }
  getTruts() {
    this.trust.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.truts = data;
         
        },
        error => {
       
        });
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
  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials() {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
       
          this.refreshList();
        },
        error => {
       
        });
  }

  searchTitle() {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
   
        },
        error => {
       
        });
  }
  lineChartMethod() {
  
  }
}
