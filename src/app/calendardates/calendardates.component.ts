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
import { allinfos } from '../services/alltable.bd';
import bootstrapPlugin from '@fullcalendar/bootstrap';

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
  constructor(private allinfos:allinfos,private router: Router,private spacsS:spacglobal,private event:events,private newses:spacs,private ngZone:NgZone, private Spacspage:spacspage) { }
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
 
    this.calendarOptions= {
      plugins: [ bootstrapPlugin ],
      initialView: 'dayGridMonth',
      events:this.currentEvents,
      dayMaxEvents:4,
      eventColor: '#378006',  
      themeSystem: 'bootstrap'
    };
  


   this.getspacs()
   this.getAllSpacsResearch();
  }

  showipo(){
    // if(this.indexipo==0){
    // this.calendarComponent.getApi().removeAllEvents();
    // this.calendarComponent.getApi().addEventSource(this.eventsipos)
    // }else{
    //   if(this.indexipo%2==0){
    //     this.calendarComponent.getApi().removeAllEvents();
    //     this.calendarComponent.getApi().addEventSource(this.eventsipos)
    //   }else{
    //     this.calendarComponent.getApi().removeAllEvents();
    //     this.calendarComponent.getApi().addEventSource(this.currentEvents)
    //   }
    // }
    // this.indexipo=this.indexipo+1;
  }
  shownews(){
    // if(this.indextermination==0){
    //   this.calendarComponent.getApi().removeAllEvents();
    //   this.calendarComponent.getApi().addEventSource(this.eventsnews)
    //   }else{
    //     if(this.indextermination%2==0){
    //       this.calendarComponent.getApi().removeAllEvents();
    // this.calendarComponent.getApi().addEventSource(this.eventsnews)
    //     }else{
    //       this.calendarComponent.getApi().removeAllEvents();
    //       this.calendarComponent.getApi().addEventSource(this.currentEvents)
    //     }
    //   }
    //   this.indextermination=this.indextermination+1;
  }
  showtermination(){
    // if(this.indexnews==0){
    //   this.calendarComponent.getApi().removeAllEvents();
    //   this.calendarComponent.getApi().addEventSource(this.eventsterm)
    //   }else{
    //     if(this.indexnews%2==0){
    //       this.calendarComponent.getApi().removeAllEvents();
    //       this.calendarComponent.getApi().addEventSource(this.eventsterm)
    //     }else{
    //       this.calendarComponent.getApi().removeAllEvents();
    //       this.calendarComponent.getApi().addEventSource(this.currentEvents)
    //     }
    //   }
    //   this.indexnews=this.indexnews+1;
 
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
