import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth"
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore"
import {Router} from "@angular/router";
import {User} from "./user"
import {GoogleAuthProvider,} from "firebase/auth"
import type { User as FireUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) {

    this.afAuth.authState.subscribe(user => {
      if(user){
        console.log("Here")
        this.SetUserData(user )
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }else{
        localStorage.setItem("user", 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }


  SignIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      result => {
        this.SetUserData(result.user )
        this.afAuth.authState.subscribe(user => {
          if(user){
            this.router.navigate([''])
          }
        })
      }
    ).catch(err => {
      window.alert(err.message)
    })
  }

  get isLoggedIn(): boolean{
    const ls = localStorage.getItem('user')
    const user = ls !== "undefined" ? JSON.parse(localStorage.getItem('user')!)  : null
    return user !== null && user.emailVerified !== false ? true : false
  }

  AuthLogin(provider: any){
    return this.afAuth.signInWithPopup(provider).then(
      result => {
        this.router.navigate(['']);
        this.SetUserData(result.user )
      }
    ).catch(err => window.alert(err.message))
  }

  SetUserData(user: FireUser){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    const userData: User = {
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL,
     emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  
  SignUp(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      result => {
        this.SendEmailVerification()
        this.SetUserData(result.user)
      }
    ).catch(err => window.alert(err.message))
  }

  SendEmailVerification(){
    return this.afAuth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {this.router.navigate(['verify-email-address'])})
  }

  GoogleAuth(){
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      this.router.navigate([''])
    })
  }

  SignOut(){
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signIn'])
    })
  }
}
