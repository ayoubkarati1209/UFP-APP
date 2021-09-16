import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {SpacDetComponent} from './spac-det/spac-det.component';
import {ResearchComponent} from './research/research.component';
import { HomeComponent } from './home/home.component';
import { CalendardatesComponent } from './calendardates/calendardates.component';
import { AbboutComponent } from './shared/abbout/abbout.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentification/login/login.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { SpacpageComponent } from './spacpage/spacpage.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { RegisterComponent } from './authentification/register/register.component';
import { SpacstableComponent } from './spacstable/spacstable.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' ,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'spacedet/:id',component:SpacDetComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'login',component:LoginComponent},
  { path : 'Register',component:RegisterComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'allspac/:id',component:SpacpageComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'terms',component:TermsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'privacy',component:PrivacyComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'home',component:HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'spacs',component:SpacstableComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'calendar',component:CalendardatesComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'research/:id',component:ResearchComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'about',component:AbboutComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'profile',component:ProfileComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
