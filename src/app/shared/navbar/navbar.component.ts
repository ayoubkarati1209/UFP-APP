import { Component, OnInit,ViewChild, ElementRef,HostListener } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {KeycloakService } from 'keycloak-angular';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { KeycloakProfile } from 'keycloak-js';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { users } from 'src/app/services/users.bd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler:ElementRef;
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  user:firebase.User
  name
  email
  photoUrl
  uid
  emailVerified;
  admin=false;
  collapsed = true;
  isCollapsed: boolean = false;
  bdinfosuser:any
  public userProfile: KeycloakProfile | null = null;
  constructor(private route:Router,private users:users,private auth:AuthenticationService,config: NgbDropdownConfig, translate: TranslateService,private keycloackService:KeycloakService,public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(auth => {
      if(auth) {
        this.auth.getUserState().subscribe(
          user=>{
            this.user=user;
            if(user.email=='admin@box-analytics.com'){
             this.admin=true;
           }
            this.users.get(user.email)
            .subscribe(
              data => {
              this.bdinfosuser=data;
              },
              error => {
              });
           
          }
        )
      } else {
        firebase.auth().signOut();
    this.route.navigate(['login']);
      }
    });
    
    config.placement = 'bottom-right';
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }
navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
  public async ngOnInit() {


    let body = document.querySelector('body');
    body.classList.add('sidebar-hidden');
  }
  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }

logout():void{
  this.auth.logout();
}
  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

}
