import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private route:Router,private afauth:AngularFireAuth) { }

  getUserState(){
    return this.afauth.authState;
  }
  signUpUser(email:string,password:string){
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          ()=>{
            console.log('connecté');
            resolve(0);
          }
        ).catch(
          (error)=>{
            reject(error)
          }
        )
      }
    )
  }
  SignUp(email, password) {
    return new Promise(
      (resolve,reject)=>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(0);
      }).catch((error) => {
        reject(error)
      })
      })
  }
  logout(){
    firebase.auth().signOut();
    this.route.navigate(['login']);
  }
  login(){
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
      }
    });
  }
}
