import { MbscModule } from '@mobiscroll/angular-lite';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { SpacsComponent } from './spacs/spacs.component';
import { SpacDetComponent } from './spac-det/spac-det.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {FixedMenuComponent} from './fixed-menu/fixed-menu.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { initializeKeycloak } from './util/app.init';
import { CollapseModule,WavesModule } from 'angular-bootstrap-md';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResearchComponent } from './research/research.component';
import { CardnewsComponent } from './cardnews/cardnews.component';
import { BackspacaddComponent } from './backspacadd/backspacadd.component';
import { ToastrModule } from 'ngx-toastr';
import { FixedmenubackComponent } from './fixedmenuback/fixedmenuback.component';
import { BackoverviewaddComponent } from './backoverviewadd/backoverviewadd.component';
import { BacktrustaddComponent } from './backtrustadd/backtrustadd.component';
import { BackadminaddComponent } from './backadminadd/backadminadd.component';
import { BackadmindetailsaddComponent } from './backadmindetailsadd/backadmindetailsadd.component';
import { BackdiraoffaddComponent } from './backdiraoffadd/backdiraoffadd.component';
import { HomeComponent } from './home/home.component';
import { NavbarModule, ButtonsModule } from 'angular-bootstrap-md'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TableFilterPipe } from './spacs/tableFilter.pipe';
import * as echarts from 'echarts';
import { CalendardatesComponent } from './calendardates/calendardates.component';
import { SpacdatableComponent } from './spacdatable/spacdatable.component';
import { HomeAllComponent } from './home-all/home-all.component';
import { HomeIpoComponent } from './home-ipo/home-ipo.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeResearchComponent } from './home-research/home-research.component';
import { HomeSecComponent } from './home-sec/home-sec.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from "ngx-spinner";  
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HighchartsChartModule } from 'highcharts-angular';
import { AbboutComponent } from './shared/abbout/abbout.component';
import { ProfileComponent } from './profile/profile.component';
import { ModifyspacComponent } from './modifyspac/modifyspac.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthenticationService } from './shared/authentication.service';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import  firebase from 'firebase';
import { UpdateresearchComponent } from './updateresearch/updateresearch.component';
import { SpacpageComponent } from './spacpage/spacpage.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
 
  declarations: [
    AppComponent,
    TableFilterPipe,
    FooterComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    SpacsComponent,
    SpacDetComponent,
    ChartjsComponent,
    CalendarComponent,
    FixedMenuComponent,
    ResearchComponent,
    CardnewsComponent,
    BackspacaddComponent,
    FixedmenubackComponent,
    BackoverviewaddComponent,
    BacktrustaddComponent,
    BackadminaddComponent,
    BackadmindetailsaddComponent,
    BackdiraoffaddComponent,
    NavbarComponent,
    HomeComponent,
    CalendardatesComponent,
    SpacdatableComponent,
    HomeAllComponent,
    HomeIpoComponent,
    HomeNewsComponent,
    HomeResearchComponent,
    HomeSecComponent,
    AbboutComponent,
    ProfileComponent,
    ModifyspacComponent,
    LoginComponent,
    RegisterComponent,
    UpdateresearchComponent,
    SpacpageComponent,
    PrivacyComponent,
    TermsComponent
  ],
  imports: [ 
    AngularFireModule.initializeApp({apiKey: "AIzaSyDawvTqfuYIkGIbkGky_NgMWN0MpG8kuaQ",
    authDomain: "ufp-spacs.firebaseapp.com",
    projectId: "ufp-spacs",
    storageBucket: "ufp-spacs.appspot.com",
    messagingSenderId: "722744551547",
    appId: "1:722744551547:web:9ac91809ed4b051b6b5ade"}),
  AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  AngularFireAuthModule,
    NgxSpinnerModule,
    LoadingBarHttpClientModule,
    KeycloakAngularModule,
    FullCalendarModule,
    MatProgressBarModule,
    MbscModule, 
    KeycloakAngularModule,
    CommonModule,
    BrowserModule,
    NavbarModule,
    LoadingBarModule,
    ButtonsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    CollapseModule,
    NgxDatatableModule,
    JwPaginationModule,
    WavesModule,
    NgxPaginationModule,
    NgbModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    Ng2PageScrollModule,
    MdbScrollspyModule,
    AutocompleteLibModule, 
  
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      closeButton:true,
    }),
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
     echarts,// or import('./path-to-my-custom-echarts')
    }),
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    })
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
