import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allinfos } from '../services/alltable.bd';
import { overs } from '../services/overview-section.bd';
import { news_nv } from '../services/news-nv.bd';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import * as cdata from './data';
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
@Component({
  selector: 'app-spacpage',
  templateUrl: './spacpage.component.html',
  styleUrls: ['./spacpage.component.scss'],
  providers: [DatePipe]

})
export class SpacpageComponent implements OnInit {
  public datac= cdata.TimeChartData;

  oversinfos:any;
  spacId: any;
  allnews:any;
  filing:any
  stockplusinfos:false
  elementUnit='Unit information';
  timelinesth = ['date', 'type', 'title'];
  timelinesthdata = ['Date', 'Type', 'Title'];
  headElements = ['name', 'position', 'age', 'description'];
  headElementsth = ['Name', 'Position', 'Age', 'Summary'];
  headElementsShareD = ['fund_name', 'shares', 'percentage'];
  headElementsShareH = ['Name', 'Shares', 'Title'];

  page = 1;
  count = 0;
  tableSize = 6;
  unit=true
  stock=false
  warrent=false
  ipo_date:any
  volumeU=0
  indiceU=0
  averageU=0
  volumeS=0
  indiceS=0
  averageS=0
  volumeW=0
  indiceW=0
  averageW=0
  priceU=[]
  priceS=[]
  priceW=[]
  pricearray=[]
  filings=[]
  days:any
  public options: any
  directors=[]
  shareholdersD=[]
  constructor(private allinfos:allinfos,private activeID:ActivatedRoute,private overviews:overs,private news:news_nv,private datePipe:DatePipe) { 

  }
  spacsinfos:any;
  ngOnInit(): void {
    this.spacId=this.activeID.snapshot.paramMap.get("id");

    this.allinfos.getAllWhere(this.spacId)
      .subscribe(
        data => {
          this.spacsinfos = data;

          for(let s of this.spacsinfos.trusts){
            this.ipo_date=s.ipo_date
            this.ipo_date=this.datePipe.transform(this.ipo_date, 'MM');
            this.ipo_date=Number(this.ipo_date)+Number(s.combination_months)
            console.log(this.ipo_date)
          }
          for(let m of this.spacsinfos.markets){
            this.days=new Date(m.date)
            if(m.type_id==1){
              this.pricearray.push([this.days.getTime(),Number(m.price)]);
              this.priceU.push({price:m.price});
            this.indiceU++
            if(this.indiceU<=3){
              this.volumeU=this.volumeU+Number(m.volume)
              this.averageU=this.volumeU/3
            }
          }
          if(m.type_id==2){
            this.priceS.push({price:m.price});
            this.indiceS++
            if(this.indiceS<=3){
              this.volumeS=this.volumeS+Number(m.volume)
              this.averageS=this.volumeS/3
            }
          }
          if(m.type_id==3){
            this.priceW.push({price:m.price});
            this.indiceW++
            if(this.indiceW<=3){
              this.volumeW=this.volumeW+Number(m.volume)
              this.averageW=this.volumeW/3
            }
          }
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
          console.log(this.pricearray);
          for(let f of this.spacsinfos.filings){
            this.filings.push({date:f.date,type:f.type,title:f.title})
          }
          for(let d of this.spacsinfos.directors){
            this.directors.push({name:d.name,position:d.position,age:d.age,summary:d.description})
          }
          for(let s of this.spacsinfos.shareholders){
            this.shareholdersD.push({title:s.percentage,shares:s.shares,name:s.fund_name})
          }
          console.log(this.shareholdersD);
        },
        error => {
          console.log(error);
        });
        this.getOvers()
        this.getNews()
  }
  getOvers(){
    this.overviews.get(this.spacId).subscribe(
      data => {
        console.log(data)
        this.oversinfos=data
      },
      error => {
        console.log(error);
      }
    )
  }
  getNews(){
    this.news.getAll()
      .subscribe(
        data => {
          this.allnews = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getfilings(){
    this.allinfos.getfilings(this.spacId)
      .subscribe(
        data => {
          this.filing = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getUnit(){
    this.unit=true
    this.stock=false
    this.warrent=false
  }
  getStock(){
this.unit=false
this.stock=true
this.warrent=false
  }
  getWarrent(){
    this.unit=false
    this.stock=false
    this.warrent=true
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
}
