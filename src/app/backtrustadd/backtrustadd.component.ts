import { Component, OnInit } from '@angular/core';
import {trusts} from '../services/trust_datat_return.db';
import {spacspage} from '../services/spacspage.bd';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-backtrustadd',
  templateUrl: './backtrustadd.component.html',
  styleUrls: ['./backtrustadd.component.scss']
})
export class BacktrustaddComponent implements OnInit {
  
  spachecks: any;

  //TRUST DATA AND RETURN CALCULATION
  trusts = {
    ipo_date: '',
    termination_date: '',
    original_length_comb_period: '',
    extendable: '',
    warrants_units_at_issuance: '',
    units_warrants: '',
    date_latest_filing: '',
    most_recent_cash_in_trust: '',
    most_recent_shares_outsanding: '',
    most_recent_cash_in_trust_per_share: '',
    estimated_monthly_accretion: '',
    estimated_cash_at_termination: '',
    return_to_termination: '',
    annualized_return_termination: '',
    fk_spac: ''
  };
  submitted_trust = false;

   constructor(private Trusts: trusts,
               private Spacspage: spacspage , private toastr:ToastrService) { }

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




  
  //TRUST DATA AND RETURN CALCULATION
  saveTrust() {
    const data = {
      ipo_date: this.trusts.ipo_date,
      termination_date: this.trusts.termination_date,
      original_length_comb_period: this.trusts.original_length_comb_period,
      extendable: this.trusts.extendable,
      warrants_units_at_issuance: this.trusts.warrants_units_at_issuance,
      units_warrants: this.trusts.units_warrants,
      date_latest_filing: this.trusts.date_latest_filing,
      most_recent_cash_in_trust: this.trusts.most_recent_cash_in_trust,
      most_recent_shares_outsanding: this.trusts.most_recent_shares_outsanding,
      most_recent_cash_in_trust_per_share: this.trusts.most_recent_cash_in_trust_per_share,
      estimated_monthly_accretion: this.trusts.estimated_monthly_accretion,
      estimated_cash_at_termination: this.trusts.estimated_cash_at_termination,
      return_to_termination: this.trusts.return_to_termination,
      annualized_return_termination: this.trusts.annualized_return_termination,
      fk_spac: this.trusts.fk_spac
    };

    this.Trusts.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted_trust = true;
          if(data)
          this.showSuccess();
        },
        error => {
          console.log(error);
          this.showError();
        });
  }

  newTrust():void {
    console.log("hello")
    this.saveTrust();
    this.submitted_trust = false;
    this.trusts = {
      ipo_date: '',
      termination_date: '',
      original_length_comb_period: '',
      extendable: '',
      warrants_units_at_issuance: '',
      units_warrants: '',
      date_latest_filing: '',
      most_recent_cash_in_trust: '',
      most_recent_shares_outsanding: '',
      most_recent_cash_in_trust_per_share: '',
      estimated_monthly_accretion: '',
      estimated_cash_at_termination: '',
      return_to_termination: '',
      annualized_return_termination: '',
      fk_spac: ''
    };
  }





}
