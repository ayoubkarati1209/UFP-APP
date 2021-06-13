import { Component, OnInit } from '@angular/core';
import {admins} from '../services/administrativ.bd';
import {adminsDet} from '../services/admin_details.bd';
import {directors} from '../services/admins_officers.bd';
import {spacspage} from '../services/spacspage.bd';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-backadminadd',
  templateUrl: './backadminadd.component.html',
  styleUrls: ['./backadminadd.component.scss']
})
export class BackadminaddComponent implements OnInit {
  
  spachecks: any;


  

  //ADMINISTRATIVES
  admins = {
    corporate_address: '',
    incorporation: '',
    telephone: '',
    fk_spac: ''
  };
  submitted_admin = false;

  //ADMINISTRATIVES DETAILS
  admin_details = {
    name: '',
    type: '',
    fk_admin: ''
  };
  submitted_admin_details = false;

  //DIRECTORS AND OFFICIERS
  directors_and_officiers = {
    name: '',
    position: '',
    age: '',
    description: '',
    fk_spac: ''
  };
  submitted_do = false;


  constructor(private Admins: admins, 
              private Admin_details: adminsDet, 
              private Directors_and_officiers: directors,
              private Spacspage: spacspage,
              private toastr:ToastrService
              ) { }

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



  
      //ADMINISTRATIVES
      saveAdmin() {
        const data = {
          corporate_address: this.admins.corporate_address,
          incorporation: this.admins.incorporation,
          telephone: this.admins.telephone,
          fk_spac: this.admins.fk_spac
        };
        console.log(data)
    
        this.Admins.create(data)
          .subscribe(
            response => {
              console.log(response);
              this.submitted_admin = true;
              if(data)
              this.showSuccess();
            },
            error => {
              console.log(error);
              this.showError();
            });
      }
    
      newAdmin():void {
        console.log("hello")
        this.saveAdmin();
        this.submitted_admin = false;
        this.admins = {
          corporate_address: '',
          incorporation: '',
          telephone: '',
          fk_spac: ''
        };
      }


      //ADMINISTRATIVES DETAILS
        saveAdmin_details() {
          const data = {
            name: this.admin_details.name,
            type: this.admin_details.type,
            fk_admin: this.admin_details.fk_admin
          };
      
          this.Admin_details.create(data)
            .subscribe(
              response => {
                console.log(response);
                this.submitted_admin_details = true;
              },
              error => {
                console.log(error);
              });
        }
      
        newAdmin_details():void {
          console.log("hello")
          this.saveAdmin_details();
          this.submitted_admin_details = false;
          this.admin_details = {
            name: '',
            type: '',
            fk_admin: ''
          };
        }


        //DIRECTORS AND OFFICIERS
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
                  this.submitted_do = true;
                },
                error => {
                  console.log(error);
                });
          }
        
          newDirectors_and_officiers():void {
            console.log("hello")
            this.saveDirectors_and_officiers();
            this.submitted_do = false;
            this.directors_and_officiers = {
              name: '',
              position: '',
              age: '',
              description: '',
              fk_spac: ''
            };
          }





}
