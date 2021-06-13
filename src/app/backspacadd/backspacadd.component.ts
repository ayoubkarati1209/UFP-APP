import { Component, OnInit } from '@angular/core';
import {spacspage} from '../services/spacspage.bd';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-backspacadd',
  templateUrl: './backspacadd.component.html',
  styleUrls: ['./backspacadd.component.scss']
})
export class BackspacaddComponent implements OnInit {
  toggleProBanner(event) {
  event.preventDefault();
  document.querySelector('body').classList.remove('pop');
}
spachecks: any;
errors:any;
//SPACS
spac = {
  name: '',
  ticker: '',
  cik: '',
  filins_link: '',
  fk_users: '1'
};
submitted_spac = false;


constructor(private Spacspage: spacspage,private toastr:ToastrService
            ) { }

ngOnInit(): void {
  this.retrieveSpacs();

}
showSuccess() {
  this.toastr.success('Les informations sons ajoutés avec succès !', this.spac.name);
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
        this.showError();
      });
}
//SPACS
saveSpac() {
  const data = {
    name: this.spac.name,
    ticker: this.spac.ticker,
    cik: this.spac.cik,
    filins_link: this.spac.filins_link,
    fk_users: this.spac.fk_users
  };

  this.Spacspage.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted_spac = true;
        if(this.submitted_spac)
        this.showSuccess();
      },
      error => {
        console.log(error);
        this.showError();
      });
}

newSpac():void {
  this.saveSpac();
  this.submitted_spac = false;
  this.spac = {
    name: '',
    ticker: '',
    cik: '',
    filins_link: '',
    fk_users: ''
  };
}






}