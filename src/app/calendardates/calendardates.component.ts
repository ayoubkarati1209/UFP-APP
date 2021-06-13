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
import { NgZone } from '@angular/core';
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
  constructor(private router: Router,private spacsS:spacglobal,private event:events,private newses:spacs,private ngZone:NgZone, private Spacspage:spacspage) { }
  ngOnInit(): void {
  
    forwardRef(() => Calendar);
    this.newses.getAll().subscribe(
      data => {
    this.news = data;
    for(let n of this.news){
      if(n.date!=""){
        this.currentEvents.push({id:n.idnews,title: n.title, date:n.date,color:'#15B947'})
        this.eventsnews.push({id:n.idnews,title: n.title, date:n.date,color:'#15B947'})
      }
    }
      }
    )
    this.event.getAll()
    .subscribe(
      data => {
        this.events = data;
        console.log(this.events)
        for(let d of this.events) {
          const date = new Date(d.dates.ipo_date)
          if(d.dates.length!=0){
            console.log(d);
            for(let da of d.dates) {
              console.log(da.ipo_date);
              this.currentEvents.push({id:d.idspac,title: d.title, date:da.ipo_date,color:'#1587B9'})
              this.eventsipos.push({id:d.idspac,title: d.title, date:da.ipo_date,color:'#1587B9'})
              this.currentEvents.push({id:d.idspac,title: d.title, date:da.termination_date,color:'#666D8B'})
              this.eventsterm.push({id:d.idspac,title: d.title, date:da.termination_date,color:'#666D8B'})

            }
           
            console.log(d.dates.ipo_date)
          }else{
          }
        }

        this.calendarOptions= {
          initialView: 'dayGridMonth',
          events:this.currentEvents,
          dayMaxEvents:4,
          eventColor: '#378006',  
          headerToolbar: {
            left:'',
            center:'',
            //right:'dayGridMonth,timeGridWeek,timeGridDay'
            right:'',
           
          },

        };
        console.log(this.currentEvents);
      },
      error => {
        console.log(error);
      });
  
   this.retrievespacsitems();
   console.log(this.month);
   console.log(this.year);

   
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
    if(this.indexnews==0){
      this.calendarComponent.getApi().removeAllEvents();
      this.calendarComponent.getApi().addEventSource(this.eventsterm)
      }else{
        if(this.indexnews%2==0){
          this.calendarComponent.getApi().removeAllEvents();
          this.calendarComponent.getApi().addEventSource(this.eventsterm)
        }else{
          this.calendarComponent.getApi().removeAllEvents();
          this.calendarComponent.getApi().addEventSource(this.currentEvents)
        }
      }
      this.indexnews=this.indexnews+1;
 
  }
  fyn(){
    this.router.navigate(['home']);
  }

  getAllSpacsResearch() {
    this.Spacspage.getAll()
      .subscribe(
        data => {
          this.spacssearch = data;
          if(this.spacssearch)
          console.log(data);
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

  retrievespacsitems() {
    this.spacsS.getAll()
      .subscribe(
        data => {
          this.allspacs = data;
          if(this.allspacs)
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  redirectlien() {
   
}
  select_year(value:string) :void{
    this.headeryear=value;
    if(this.monthchange){
    this.yearchange=value;
    console.log(this.monthchange);
    console.log(value+'-'+0+this.monthchange+'-15');
    this.calendarComponent.getApi().gotoDate(value+'-'+0+this.monthchange+'-15');
    }else{
      this.calendarComponent.getApi().gotoDate(value+'-04-15');
    }
  }
  select_month(value:string) :void{
    this.headermonth=value;
    this.monthchange=value;
    console.log(this.yearchange)
    if(this.yearchange){
      if(this.monthchange<=9){
      this.calendarComponent.getApi().gotoDate(this.yearchange+'-'+0+this.monthchange+'-15');
      }
      else{
        this.calendarComponent.getApi().gotoDate(this.yearchange+'-'+this.monthchange+'-15');
      }
    }else{
      if(this.monthchange<=9){
    console.log('hey');
    console.log("the selected value is " + value);
    this.calendarComponent.getApi().gotoDate('2021-'+0+this.monthchange+'-15');
      }else{
        this.calendarComponent.getApi().gotoDate('2021-'+this.monthchange+'-15');
      }
    }
  }

}
