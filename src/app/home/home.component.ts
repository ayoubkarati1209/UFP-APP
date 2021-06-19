import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FixedScaleAxis } from 'chartist';
import { NgbDate, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {spacs} from '../services/spacs.bd'; 
import {spacglobal} from '../services/spacglobal.bd';
import {spacspage} from '../services/spacspage.bd';
import { Pipe, PipeTransform } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { orderBy } from 'lodash';
import { allinfos } from '../services/alltable.bd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
@Pipe({ name: 'sortBy' })
export class HomeComponent implements OnInit,PipeTransform {
  transform(value: any[], order :any, column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }
  keyword = 'name';
  public showNavbar: boolean = true;
  public  showFooter: boolean = true;


  colorAll = "white";
  BackcolorAll = "#313C64";
  
  colorNews = "inherit";
  BackcolorNews = "";
  
  colorIpo = "inherit";
  BackcolorIpo = "";
  
  colorSec = "inherit";
  BackcolorSec = "";

  colorResearch = "inherit";
  BackcolorResearch = "";
 
  ShowAll : boolean = true;
  ShowNews : boolean = false;
  ShowIpo : boolean = false;
  ShowSec : boolean = false;
  ShowResearch : boolean = false;
  
  spacssearch:any;
  spacsitems:any;
  currentspac=null;
  currentIndex=-1;
  allspacs:any;
  no_data:boolean=false;
title='';
  toggleProBanner(event) {
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }
  @ViewChild('d', {static: false}) datepicker: NgbInputDatepicker;

// Performance indicator chart
  performanceIndicatorBarchartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [30, 25, 50, 25, 50, 25, 50, 55, 20, 35, 25, 30 ],
      [25, 50, 10, 35, 30, 15, 20, 20, 30, 25, 10, 15 ],
      [45, 25, 40, 40, 20, 60, 30, 25, 50, 40, 65, 55 ]
    ]
  };

  performanceIndicatorBarchartOptions = {
    stackBars: true,
            height: 200,
            axisY: {
              type: FixedScaleAxis,
              ticks: [0, 25, 50, 75, 100]
            },
            showGridBackground: false
  };

  performanceIndicatorBarchartResponsiveOptions = [
    ['screen and (max-width: 480px)', {
      height: 150,
    }]
  ];

  // Sessions by channel doughnut chart

  doughnutPieData = [{
    data: [55, 25, 20],
    backgroundColor: [
        '#ffca00',
        '#38ce3c',
        '#ff4d6b'
    ],
    borderColor: [
      '#ffca00',
      '#38ce3c',
      '#ff4d6b'
    ],
  }];

  doughnutPieLabels: [
    'Reassigned',
    'Not Assigned',
    'Assigned'
  ];
  doughnutPieOptions = {
    cutoutPercentage: 75,
    animationEasing: 'easeOutBounce',
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    legend: {
        display: false
    },
    layout: {
      padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
      }
    }
  };

  // Income expense chart date range picker properties

  hoveredDate: NgbDate;
category="All";
  fromDate: NgbDate;
  toDate: NgbDate;
  onFirstSelection: boolean = true;

  // Income expense chart

  incomeExpenseSummaryChartData = {
    // A labels array that can contain any sort of values
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [505, 781, 480, 985, 410, 822, 388, 874, 350, 642, 320, 796],
      [700, 430, 725, 390, 686, 392, 757, 500, 820, 400, 962, 420]
    ]
  };

  incomeExpenseSummaryChartOptions = {
    height: 300,
    axisY: {
      high: 1000,
      low: 250,
      referenceValue: 1000,
      type: FixedScaleAxis,
      ticks: [250, 500, 750, 1000]
    },
    showArea: true,
    showPoint: false,
    fullWidth: true
  };

  incomeExpenseSummaryChartResponsiveOptions = [
    ['screen and (max-width: 480px)', {
      height: 150,
      axisX: {
        labelInterpolationFnc: (value) => value,
      }
    }]
  ];
  arraysort=[]
  arraynotsort:any
  // Income expense chart date range picker methods

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.onFirstSelection = false;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.onFirstSelection = true;
      this.datepicker.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.onFirstSelection = false;
    }
  }

  toNativeDate(date:NgbDate) {
    if(date){
      return new Date(date.year, date.month, date.day);
    }else {
      return "";
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  constructor(private allinfos:allinfos,calendar: NgbCalendar,  private spacsS:spacs,private spacs:spacglobal, private Spacspage:spacspage) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
 
  ngOnInit():void{
    this.retrievespacsitems();
    this.getAllSpac();
    this.getAllSpacsResearch();
    this.getspactickers();
  }

  getspactickers() {
    this.allinfos.getspacticker()
      .subscribe(
        data => {
          this.allspacs = data;
          console.log(this.allspacs)
        },
        error => {
        });
  }                
                                    
  selectEvent(item){
    
  }  
  
  onchangeSearch(search: string){

  }

  onFocused(e){

  }
                                    
  HomeResearch():void{
  }

  ShowAllItems():void{

    this.ShowAll = true;
    this.ShowNews = false;
    this.ShowIpo = false;
    this.ShowSec = false;
    this.ShowResearch = false;

    this.colorAll = "white";
    this.BackcolorAll = "#313C64";
    
    this.colorNews = "inherit";
    this.BackcolorNews = "";
    
    this.colorIpo = "inherit";
    this.BackcolorIpo = "";
    
    this.colorSec = "inherit";
    this.BackcolorSec = "";

    this.colorResearch = "inherit";
    this.BackcolorResearch = "";
  }                                                                
  ShowNewsItems():void{

    this.ShowAll = false;
    this.ShowNews = true;
    this.ShowIpo = false;
    this.ShowSec = false;
    this.ShowResearch = false;

    this.colorAll = "inherit";
    this.BackcolorAll = "";
    
    this.colorNews = "white";
    this.BackcolorNews = "#313C64";
    
    this.colorIpo = "inherit";
    this.BackcolorIpo = "";
    
    this.colorSec = "inherit";
    this.BackcolorSec = "";

    this.colorResearch = "inherit";
    this.BackcolorResearch = "";
  }                                                                
  ShowIpoItems():void{

    this.ShowAll = false;
    this.ShowNews = false;
    this.ShowIpo = true;
    this.ShowSec = false;
    this.ShowResearch = false;

    this.colorAll = "inherit";
    this.BackcolorAll = "";
    
    this.colorNews = "inherit";
    this.BackcolorNews = "";
    
    this.colorIpo = "white";
    this.BackcolorIpo = "#313C64";
    
    this.colorSec = "inherit";
    this.BackcolorSec = "";

    this.colorResearch = "inherit";
    this.BackcolorResearch = "";
  }                                                                
  ShowSecItems():void{

    this.ShowAll = false;
    this.ShowNews = false;
    this.ShowIpo = false;
    this.ShowSec = true;
    this.ShowResearch = false;

    this.colorAll = "inherit";
    this.BackcolorAll = "";
    
    this.colorNews = "inherit";
    this.BackcolorNews = "";
    
    this.colorIpo = "inherit";
    this.BackcolorIpo = "";
    
    this.colorSec = "white";
    this.BackcolorSec = "#313C64";

    this.colorResearch = "inherit";
    this.BackcolorResearch = "";
  }                                                                
  ShowResearchItems():void{

    this.ShowAll = false;
    this.ShowNews = false;
    this.ShowIpo = false;
    this.ShowSec = false;
    this.ShowResearch = true;

    this.colorAll = "inherit";
    this.BackcolorAll = "";
    
    this.colorNews = "inherit";
    this.BackcolorNews = "";
    
    this.colorIpo = "inherit";
    this.BackcolorIpo = "";
    
    this.colorSec = "inherit";
    this.BackcolorSec = "";

    this.colorResearch = "white";
    this.BackcolorResearch = "#313C64";
  }


  getNewsC():void{
    if(this.retrievespacsitems)
this.category="News";
  }
sort(){
  this.arraysort=this.spacsitems.sort((a,b) => a.title > b.title ? 1 : -1)
  this.spacsitems=this.arraysort
  console.log(this.spacsitems)
}
  getAllSpacsResearch() {
    this.Spacspage.getAll()
      .subscribe(
        data => {
          this.spacssearch = data;
          if(this.spacssearch){
            this.no_data=false
          }
          else{
            this.no_data=true;
          }
        },
        error => {
        });
  }

  retrievespacsitems() {
    this.spacsS.getAll()
      .subscribe(
        data => {
          this.spacsitems = data;
        },
        error => {
        });
  }

  getAllSpac() {
    this.spacs.getAll()
      .subscribe(
        data => {

        },
        error => {
        });
  }
  refreshList() {
    this.retrievespacsitems();
    this.currentspac = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index) {
    this.currentspac = tutorial;
    this.currentIndex = index;
  }

  removeAllspacsitems() {
    this.spacsS.deleteAll()
      .subscribe(
        response => {
          this.refreshList();
        },
        error => {
        });
  }

  searchTitle() {
    this.spacsS.findByTitle(this.title)
      .subscribe(
        data => {
          this.spacsitems = data;
        },
        error => {
        });
  }

  style = {
    sources: {
      world: {
        type: "geojson",
        data: "assets/world.geo.json"
      }
    },
    version: 8,
    layers: [
      {
        "id": "countries-fill",
        "type": "fill",
        "source": "world",
        "layout": {},
        "paint": {
          'fill-color': '#000000',
        },
      },
      {
        "id": "countries-border",
        "type": "line",
        "source": "world",
        "layout": {},
        "paint": {
          'line-color': '#ffffff',
        },
      }
    ]
  }

}