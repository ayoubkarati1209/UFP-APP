import { Component, OnInit } from '@angular/core';
import {adminsDet} from '../services/admin_details.bd';
import {admins} from '../services/administrativ.bd';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-backadmindetailsadd',
  templateUrl: './backadmindetailsadd.component.html',
  styleUrls: ['./backadmindetailsadd.component.scss']
})
export class BackadmindetailsaddComponent implements OnInit {

  adminchecks: any;

  //ADMINISTRATIVES DETAILS
  admin_details = {
    name: '',
    type: '',
    fk_admin: ''
  };
  submitted_admin_details = false;

  constructor(private Admin_details: adminsDet, 
              private Adminis: admins,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.retrieveAdmin();
  }
  showSuccess() {
    this.toastr.success('Les informations sons ajoutés avec succès !','succes');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
  retrieveAdmin() {
    this.Adminis.getAll()
      .subscribe(
        data => {
          this.adminchecks = data;
          if(this.adminchecks)
          console.log(data);
        },
        error => {
          console.log(error);
        });
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
              if(data)
              this.showSuccess();
            },
            error => {
              console.log(error);
              this.showError();
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


}
