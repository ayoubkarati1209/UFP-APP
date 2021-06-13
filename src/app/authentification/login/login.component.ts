import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import {ToastrService} from 'ngx-toastr';
import { Router ,ɵROUTER_PROVIDERS,Routes} from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { users } from 'src/app/services/users.bd';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
signinForm:FormGroup;
public redirectUrl: string;
public showNavbar: boolean = false;
public  showFooter: boolean = false;
data:string
navigation = this.router.getCurrentNavigation();

  constructor(private users:users,private formBuilder:FormBuilder,private router: Router,private toastr:ToastrService,    private authentificationservice:AuthenticationService
    ) { 
      this.initSigninForm()
      this.redirectUrl="home";
  }
  showSuccess() {
    this.toastr.success('Les informations sons ajoutés avec succès !','succes');
  }
  showError() {
    this.toastr.error('Email or Password incorrect !', 'error');
  }
  ngOnInit(): void {
    const state = this.navigation.extras.state as {data: string};
    if(state){
      this.data = state.data;
    }else{

    }
    console.log(this.data)
    this.initSigninForm()
  }
initSigninForm(){
  this.signinForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
}
onSubmitSigninForm(){
  const email=this.signinForm.get('email').value;
  const password=this.signinForm.get('password').value;
  this.authentificationservice.signUpUser(email,password).then(
    ()=>{
 
        this.users.get(email)
                .subscribe(
                  response => {
                    this.showNavbar=true;
      this.showFooter=true;
      this.router.navigate([this.redirectUrl]);
                    this.showSuccess();
                  },
                  error => {
                    this.data='you are not yet authorized, please contact your administrator';
                  });
    
    }
  ).catch(
    (error)=>{
     this.showError()
    }
  )
}
}
