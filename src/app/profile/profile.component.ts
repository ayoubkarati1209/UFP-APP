import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import {KeycloakService } from 'keycloak-angular';
import { users } from 'src/app/services/users.bd';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../app/shared/authentication.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public isLoggedIn = false;
  user:firebase.User
  admin:boolean=false
  bdinfosuser:any
  public userProfile: KeycloakProfile | null = null;
  modalRef: BsModalRef;
  profile_infos: FormGroup;
  iduser:any;
  @ViewChild('update') templateRef: TemplateRef<any>;
  constructor(private toastr:ToastrService,public formBuilder: FormBuilder,public modalService: BsModalService,private auth:AuthenticationService,private users:users,public afAuth: AngularFireAuth) { 
   
    this.profile_infos = this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      username:['',Validators.required],
    })
    afAuth.authState.subscribe(auth => {
      if(auth) {

      } else {

      }
    });

  }

  public async ngOnInit(){
  this.getinfos()
  }
  getinfos(){
    this.auth.getUserState().subscribe(
      user=>{
        this.user=user;
        if(user.email=='hello@dba.com'){
         this.admin=true;
       }
        this.users.get(user.email)
        .subscribe(
          data => {
          this.bdinfosuser=data;
          this.iduser=this.bdinfosuser.id;
          this.profile_infos.setValue({
            first_name:data['first_name'],
            last_name:data['last_name'],
            username:data['username'],
          })
          },
          error => {
          });
       
      }
    )
  }
  showSuccess() {
    this.toastr.success('DATA SUCCESSFULLY UPDATED','PLEASE REMOVE');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
  openModal(template: TemplateRef<any>) {
    const user = {
        id: 10
      };
    this.modalRef = this.modalService.show(template, {
      initialState : user
    });
  }
  onModify():any{
    this.users.update(this.iduser,this.profile_infos.value)
    .subscribe(
      data => {
        this.showSuccess()
        this.modalRef.hide();
        this.bdinfosuser.length=0
        this.getinfos()
      },error=>{
        this.showError()
      }
    );
  } 
}
