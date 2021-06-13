import { Component, OnInit } from '@angular/core';
import {spacspage} from '../services/spacspage.bd';
import {directors} from '../services/admins_officers.bd';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-backdiraoffadd',
  templateUrl: './backdiraoffadd.component.html',
  styleUrls: ['./backdiraoffadd.component.scss']
})
export class BackdiraoffaddComponent implements OnInit {
  spachecks: any;
  directors_and_officiers = {
    name: '',
    position: '',
    age: '',
    description: '',
    fk_spac: ''
  };
  submitted_directors = false;

  constructor(private spacs:spacspage,private Directors_and_officiers: directors,private toastr:ToastrService) { }

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
    this.spacs.getAll()
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
  saveDirectors_and_officiers() {
    const data = {
      name: this.directors_and_officiers.name,
      position: this.directors_and_officiers.position,
      age: this.directors_and_officiers.age,
      description: this.directors_and_officiers.description,
      fk_spac: this.directors_and_officiers.fk_spac
    };

    this.Directors_and_officiers.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted_directors = true;
          if(data)
          this.showSuccess();
        },
        error => {
          console.log(error);
          this.showError();
        });
  }
  newDirectors_and_officiers():void {
    console.log("hello")
    this.saveDirectors_and_officiers();
    this.submitted_directors = false;
    this.directors_and_officiers = {
      name: '',
      position: '',
      age: '',
      description: '',
      fk_spac: ''
    };
  }
}

