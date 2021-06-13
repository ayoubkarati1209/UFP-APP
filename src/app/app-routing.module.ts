import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SpacsComponent } from './spacs/spacs.component';
import {SpacDetComponent} from './spac-det/spac-det.component';
import { CalendarComponent } from './calendar/calendar.component';
import {ResearchComponent} from './research/research.component';
import { BackspacaddComponent } from './backspacadd/backspacadd.component';
import { BackoverviewaddComponent } from './backoverviewadd/backoverviewadd.component';
import { BacktrustaddComponent } from './backtrustadd/backtrustadd.component';
import { BackadminaddComponent } from './backadminadd/backadminadd.component';
import { BackadmindetailsaddComponent } from './backadmindetailsadd/backadmindetailsadd.component';
import { BackdiraoffaddComponent } from './backdiraoffadd/backdiraoffadd.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './util/app.gard';
import { CalendardatesComponent } from './calendardates/calendardates.component';
import { SpacdatableComponent } from './spacdatable/spacdatable.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeSecComponent } from './home-sec/home-sec.component';
import { HomeIpoComponent } from './home-ipo/home-ipo.component';
import { HomeResearchComponent } from './home-research/home-research.component';
import { HomeAllComponent } from './home-all/home-all.component';
import { AbboutComponent } from './shared/abbout/abbout.component';
import { ProfileComponent } from './profile/profile.component';
import { ModifyspacComponent } from './modifyspac/modifyspac.component';
import { LoginComponent } from './authentification/login/login.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { UpdateresearchComponent } from './updateresearch/updateresearch.component';
import { SpacpageComponent } from './spacpage/spacpage.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { RegisterComponent } from './authentification/register/register.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'spacedet/:id',component:SpacDetComponent},
  { path : 'login',component:LoginComponent},
  { path : 'Register',component:RegisterComponent},
  { path : 'allspac/:id',component:SpacpageComponent},
  { path : 'terms',component:TermsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'privacy',component:PrivacyComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'Add-research',component:UpdateresearchComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'spacedetails/:id',component:ModifyspacComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'home',component:HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'homeall',component:HomeAllComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'homenews',component:HomeNewsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'homesec',component:HomeSecComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'homeipo',component:HomeIpoComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'homeresearch',component:HomeResearchComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'spacs',component:SpacsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'calendar',component:CalendardatesComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'research/:id',component:ResearchComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backspacadd',component:BackspacaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backoverviewadd',component:BackoverviewaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backtrustadd',component:BacktrustaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backadminadd',component:BackadminaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backadmindetailsadd',component:BackadmindetailsaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'backdiraoffadd',component:BackdiraoffaddComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'datable',component:SpacdatableComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'about',component:AbboutComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'profile',component:ProfileComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
