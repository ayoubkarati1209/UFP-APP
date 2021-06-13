import { Component, OnInit } from '@angular/core';
import {spacs} from '../services/spacs.bd';
import { ActivatedRoute } from '@angular/router';
import {spacspage} from '../services/spacspage.bd';
import {filings} from '../services/filings_timelines.bd';
import {spacglobal} from '../services/spacglobal.bd'

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
  constructor(private spcasglobal:spacglobal,private news:spacs,private spac:spacspage ,private activeID:ActivatedRoute,private filing:filings,private similarspac:spacs) { }

  ngOnInit() {
    this.newsId=this.activeID.snapshot.paramMap.get("id");
    this.news.getLimit().subscribe(
      data =>{
this.newsresarch=data;
      },
      error => {
      });
      this.news.get(this.newsId)
      .subscribe(
        data => {
          this.newsDet = data;
          if(data)
          this.spac.get(this.newsDet.fk_spac)
      
          .subscribe(
            response => {
              
              this.spacs = response;
            },
            error => {
              console.log(error);
            });
            this.spcasglobal.getwhereid(this.newsDet.fk_spac).subscribe(
              response => {
              this.spacglobal=response;
              for(let sg of this.spacglobal){
                let index = this.spacglobal.findIndex(x => x.idspac ===sg.idspac);
                this.arrayspac.push({company:sg.Company,ticker:sg.ticker,currentmarket:"",industry:"",status:""})
                for(let o of sg.overviews){
  this.arrayspac[index].currentmarket=o.current_market_cap
  this.arrayspac[index].industry=o.intended_industry_focus
  this.arrayspac[index].status=o.target
  
                }
              }
              },
              error =>{
  console.log(error)
              }
            )
          if(this.newsDet.category=='Research'){
          this.resarch=true;
          }else
          {
            this.resarch=false;
          }
        },
        error => {
          console.log(error);
        });
        this.filing.getLimit()
        .subscribe(
          data => {
            this.timelines = data;
          
          },
          error => {
            console.log(error);
          });
          this.spac.getLimit()
          .subscribe(
            data => {
              this.similarspacs = data;
            },
            error => {
              console.log(error);
            });
    this.getDetNews();
this.getfilings();
this.getSpacs();
this.getNewsResearch()
  }
  getNewsResearch(){
    this.news.getLimit().subscribe(
      data =>{
this.newsresarch=data;
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
