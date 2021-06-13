import { Component, OnInit } from '@angular/core';
import {spacspage} from '../services/spacspage.bd';
import {overview} from '../services/overview.bd';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-backoverviewadd',
  templateUrl: './backoverviewadd.component.html',
  styleUrls: ['./backoverviewadd.component.scss']
})
export class BackoverviewaddComponent implements OnInit {

  spachecks: any;
  

//OVERVIEWS
overview = {
  current_market_cap: '',
  monthly_admin_fees: '',
  intended_industry_focus: '',
  ipo_lead_manager: '',
  statuts: '',
  target: '',
  fk_spac: ''
};
submitted_overview = false;

  constructor(private Overview: overview,
              private Spacspage: spacspage,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.retrieveSpacs();
  }
  showSuccess() {
    this.toastr.success('Les informations sons ajoutés avec succès !','succes');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
  retrieveSpacs() {
    this.Spacspage.getAll()
      .subscribe(
        data => {
          this.spachecks = data;
          if(this.spachecks)
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  
//OVERVIEWS
saveOverview() {
  const data = {
    current_market_cap: this.overview.current_market_cap,
    monthly_admin_fees: this.overview.monthly_admin_fees,
    ipo_lead_manager: this.overview.ipo_lead_manager,
    intended_industry_focus: this.overview.intended_industry_focus,
    statuts: this.overview.statuts,
    target: this.overview.target,
    fk_spac: this.overview.fk_spac
  };

  this.Overview.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted_overview = true;
        if(data)
        this.showSuccess();
      },
      error => {
        console.log(error);
        this.showError();
      });
}

newOverview():void {
  this.saveOverview();
  this.submitted_overview = false;
  this.overview = {
    current_market_cap: '',
    monthly_admin_fees: '',
    ipo_lead_manager: '',
    intended_industry_focus: '',
    statuts: '',
    target: '',
    fk_spac: ''
  };
}



}
