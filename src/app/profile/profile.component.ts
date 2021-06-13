import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import {KeycloakService } from 'keycloak-angular';
import { users } from 'src/app/services/users.bd';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../app/shared/authentication.service';

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
  constructor(private auth:AuthenticationService,private users:users,public afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(auth => {
      if(auth) {

      } else {
        console.log('not logged in');
      }
    });

  }

  public async ngOnInit(){
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
          console.log(this.bdinfosuser)
          },
          error => {
          });
       
      }
    )
  }

}
