import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';

import 'rxjs/add/operator/map';


import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(private _flashMessages: FlashMessagesService, private _router: Router, private _clientService: ClientService, private _route: ActivatedRoute, private _authService: AuthService) {

  }


  ngOnInit() {

    this._authService.getAuth()
      .subscribe((auth) => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
          console.log(auth.uid)
          this._clientService.setClientUUid(auth.uid)
        }else{
          this.isLoggedIn = false;
        }
      })

  };//

  onLogoutClick(){
    this._authService.logout()
      .then(() => {
        this._flashMessages.show('You are logged out',{cssClass:'alert-success',timeout:2000})
        this._router.navigate(["/login"]);
      })
  }

}
