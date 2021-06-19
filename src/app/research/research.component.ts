import { Component, OnInit } from '@angular/core';
import {spacs} from '../services/spacs.bd';
import { ActivatedRoute } from '@angular/router';
import {spacspage} from '../services/spacspage.bd';
import {filings} from '../services/filings_timelines.bd';
import {spacglobal} from '../services/spacglobal.bd'
import { news_nv } from '../services/news-nv.bd';
import { allinfos } from '../services/alltable.bd';
@Component({ 
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
newsDet:any;
newsId:string
spacId:any;
resarch:boolean=false;
spacs:any;
idspac=1;
timelines:any;
newsresarch:any;
similarspacs:any;
spacglobal:any; 
arrayspac=[];
allspacs:any;
allnews:any;
  constructor(private allinfosspac:allinfos,private newsR:news_nv,private spcasglobal:spacglobal,private news:spacs,private spac:spacspage ,private activeID:ActivatedRoute,private filing:filings,private similarspac:spacs) { }

  ngOnInit() {
    this.getspactickers()
    this.newsId=this.activeID.snapshot.paramMap.get("id");
    this.newsR.get(this.newsId).subscribe(
      data =>{
this.newsresarch=data;
console.log(data);
this.allinfosspac.getStoR(this.newsresarch.spac_id).subscribe(
  data =>{
    this.spacglobal=data;
console.log(this.spacglobal);
  },
  error =>{

  });
      },
      error => {
      });
    this.getDetNews();
this.getfilings();
this.getSpacs();
this.getNews();
  }
  getNews(){
    this.newsR.getAll()
      .subscribe(
        data => {
          this.allnews = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  getspactickers(){
  this.allinfosspac.getspacticker()
      .subscribe(
        data => {
          this.allspacs = data;
          console.log(this.allspacs)
        },
        error => {
        });
}
  getDetNews() {
    
  }
  getfilings() {
   
  }
  getSpacs() {
   
  }
}
