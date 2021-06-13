import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'UFP';
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  showSettings: boolean = true;
  isLoading: boolean;
  showfixedmenu : boolean = false;
  showfixedmenuBack : boolean = false;
  id :number;

  constructor(private router: Router, translate: TranslateService,private activeID:ActivatedRoute) {
  
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => { 
      var lien = '/spacdet/'+this.id;
      if(event instanceof NavigationStart) {
        if(event.url=='/login'){
          this.showFooter=false;
          this.showNavbar=false;
        }
        if(event.url=='/Register'){
          this.showFooter=false;
          this.showNavbar=false;
        }
        if(event.url=='/home'){
          this.showFooter=true;
          this.showNavbar=true;
        }
        if((event.url === '/backspacadd') || (event.url === '/backoverviewadd') || (event.url === '/backtrustadd') || (event.url === '/backadminadd') || (event.url === '/backadmindetailsadd')|| (event.url === '/backdiraoffadd')){
          this.showfixedmenuBack = true;
        }else{
          this.showfixedmenuBack = false;
        }
     
        if((event.url[0]==='/')&& (event.url[8]==='t') && (event.url[9]==='/') || (event.url[1]==='a') && (event.url[6]=='a')){
          this.showfixedmenu = true;
        }else{
          this.showfixedmenu = false;
        }

      
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading = false;
      }
    });
  }


  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}
