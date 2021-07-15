import {spacglobal} from '../services/spacglobal.bd'; 
import {spacspage} from '../services/spacspage.bd';
import {events} from '../services/events.bd'; 
import {FullCalendarComponent} from '@fullcalendar/angular';
import { Router } from '@angular/router';
import {Component,AfterViewChecked,OnInit,ViewChild,ElementRef,forwardRef} from "@angular/core";
import '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/angular';
import {spacs} from '../services/spacs.bd';
import { Calendar } from '@fullcalendar/core';
import {AuthGuard} from '../util/app.gard';
import { RouterModule, Routes } from '@angular/router';
import {SpacDetComponent} from '../spac-det/spac-det.component';
import { NgZone,Inject, LOCALE_ID } from '@angular/core';
import { allinfos } from '../services/alltable.bd';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { formatDate } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'spacedet/:id',component:SpacDetComponent,canActivate:[AuthGuard]},
];
@Component({
  selector: 'app-calendardates',
  templateUrl: './calendardates.component.html',
  styleUrls: ['./calendardates.component.scss']
})
export class CalendardatesComponent implements OnInit {
  keyword = 'name';
  indexipo=0;
  indextermination=0;
  indexnews=0;
  spacssearch:any;
  contractTypeValid:boolean;
  @ViewChild(FullCalendarComponent, {static: false})
  calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions
currentEvents=[];
  allspacs:any;
  events:any;
  news:any;
  ipo_date:any;
  calendarApi:any;
  monthchange:any;
  yearchange:any;
  headermonth:any;
  headeryear:any;
  month=new Date().getMonth();
  year=new Date().getFullYear();
  eventsipos=[];
  eventsnews=[];
  eventsterm=[];
  ipos:any;
  spacsticker:any;
  constructor(@Inject(LOCALE_ID) public locale: string,private allinfos:allinfos,private router: Router,private spacsS:spacglobal,private event:events,private newses:spacs,private ngZone:NgZone, private Spacspage:spacspage) { }
  ngOnInit(): void {
  
    forwardRef(() => Calendar);
    this.newses.getAll().subscribe(
      data => {
    this.news = data;
    this.allinfos.getAlltrusts().subscribe(data=>{
      this.ipos=data;
      for(let i of this.ipos){
        this.allinfos.getSpacsid(i.spac_id).subscribe(data=>{
          this.spacsticker=data;
          if(this.spacsticker){

          this.ipo_date=formatDate(i.ipo_date, 'yyyy-MM-dd' ,this.locale);
          this.currentEvents.push({id:i.id,title:this.spacsticker.name, date:this.ipo_date,color:'#1587B9'})
          this.eventsipos.push({id:i.id,title:this.spacsticker.name, date:this.ipo_date,color:'#1587B9'})
          }
        })
       
      }
    })
    for(let n of this.news){
      if(n.date!=""){
        this.currentEvents.push({id:n.id,title: n.title, date:n.date,color:'#69F0AE'})
        this.eventsnews.push({id:n.id,title: n.title, date:n.date,color:'#69F0AE'})
      }
    }
      }
    )
 
    this.calendarOptions= {
      plugins: [ bootstrapPlugin ],
      initialView: 'dayGridMonth',
      events:this.currentEvents,
      dayMaxEvents:4,
      height: 800,
      contentHeight: 780,
      aspectRatio: 3,  // see: https://fullcalendar.io/docs/aspectRatio

      nowIndicator: true,
      eventColor: '#378006',  
      themeSystem: 'bootstrap'
    };
  console.log(this.currentEvents);


   this.getspacs()
   this.getAllSpacsResearch();
  }

  showipo(){
    if(this.indexipo==0){
    this.calendarComponent.getApi().removeAllEvents();
    this.calendarComponent.getApi().addEventSource(this.eventsipos)
    }else{
      if(this.indexipo%2==0){
        this.calendarComponent.getApi().removeAllEvents();
        this.calendarComponent.getApi().addEventSource(this.eventsipos)
      }else{
        this.calendarComponent.getApi().removeAllEvents();
        this.calendarComponent.getApi().addEventSource(this.currentEvents)
      }
    }
    this.indexipo=this.indexipo+1;
  }
  shownews(){
    if(this.indextermination==0){
      this.calendarComponent.getApi().removeAllEvents();
      this.calendarComponent.getApi().addEventSource(this.eventsnews)
      }else{
        if(this.indextermination%2==0){
          this.calendarComponent.getApi().removeAllEvents();
    this.calendarComponent.getApi().addEventSource(this.eventsnews)
        }else{
          this.calendarComponent.getApi().removeAllEvents();
          this.calendarComponent.getApi().addEventSource(this.currentEvents)
        }
      }
      this.indextermination=this.indextermination+1;
  }
  showtermination(){
 
  }
  fyn(){
    this.router.navigate(['home']);
  }

  getAllSpacsResearch() {
    this.Spacspage.getAll()
      .subscribe(
        data => {
          this.spacssearch = data;
         
        },
        error => {
          console.log(error);
        });
  }
  selectEvent(item){
    
  }  
  
  onchangeSearch(search: string){

  }

  onFocused(e){

  }
  getspacs() {
    this.allinfos.getspacpagination()
      .subscribe(
        data => {
          this.allspacs = data;
          
         
        },
        error => {
        });
  }
  redirectlien() {
   
}
  // select_year(value:string) :void{
  //   this.headeryear=value;
  //   if(this.monthchange){
  //   this.yearchange=value;
  //   console.log(this.monthchange);
  //   console.log(value+'-'+0+this.monthchange+'-15');
  //   this.calendarComponent.getApi().gotoDate(value+'-'+0+this.monthchange+'-15');
  //   }else{
  //     this.calendarComponent.getApi().gotoDate(value+'-04-15');
  //   }
  // }
  // select_month(value:string) :void{
  //   this.headermonth=value;
  //   this.monthchange=value;
  //   console.log(this.yearchange)
  //   if(this.yearchange){
  //     if(this.monthchange<=9){
  //     this.calendarComponent.getApi().gotoDate(this.yearchange+'-'+0+this.monthchange+'-15');
  //     }
  //     else{
  //       this.calendarComponent.getApi().gotoDate(this.yearchange+'-'+this.monthchange+'-15');
  //     }
  //   }else{
  //     if(this.monthchange<=9){
  //   console.log('hey');
  //   console.log("the selected value is " + value);
  //   this.calendarComponent.getApi().gotoDate('2021-'+0+this.monthchange+'-15');
  //     }else{
  //       this.calendarComponent.getApi().gotoDate('2021-'+this.monthchange+'-15');
  //     }
  //   }
  // }

}
