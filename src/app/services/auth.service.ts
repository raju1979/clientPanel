import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private _afAuth:AngularFireAuth) {


   }

   login(email:string,password:string){
     return new Promise((resolve,reject) => {
       this._afAuth.auth.signInWithEmailAndPassword(email,password)
        .then(userData => resolve(userData),
        (err) => reject(err)
        )
     });
   };//

  //  checkUserStatus
  getAuth(){
    return this._afAuth.authState.map(auth => auth);
  }

  //log out
  logout(){
    return this._afAuth.auth.signOut();
  }

  ///register
  register(email,password){
    return new Promise((resolve,reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email,password)
       .then(userData => resolve(userData),
       (err) => reject(err)
       )
    }); 
  }

}
