import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { MustMatch } from '../../_helpers/must-match.validator';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import {ToastrService} from 'ngx-toastr';
import { users } from 'src/app/services/users.bd';
import { NavigationExtras,Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  submitted = false;
  showNavbar=false;
  showFooter=false;
  navigationExtras: NavigationExtras = {state: {data: 'you are not yet authorized, please contact your administrator'}};
  constructor(private router:Router,private users:users,private toastr:ToastrService,private formBuilder: FormBuilder, private authentificationservice:AuthenticationService) {
   }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      authorized:0,
      type_id:1
    },{
    validator: MustMatch('password', 'confirmPassword')
    }
    )
  }
  get f() { return this.registerform.controls; }
  showSuccess() {
    this.toastr.success('Account created');
  }
  showError($message) {
    this.toastr.error($message, 'error');
  }
  UserCreate(){
    this.users.create(this.registerform.value)
            .subscribe(
              response => {
                console.log(response);
                this.showSuccess();
              },
              error => {
                console.log(error);
              });
  }
onSubmit(){
  this.submitted = true;
  if (this.registerform.invalid) {
    return;
}

const email=this.registerform.get('email').value;
const password=this.registerform.get('password').value;
this.authentificationservice.SignUp(email,password).then(
  ()=>{
    this.UserCreate()
    this.showNavbar=true;
    this.showFooter=true;
    this.router.navigate(['/login'], this.navigationExtras);

  }
).catch(
  (error)=>{
  this.showError(error.message)
  }
)
}
}
 