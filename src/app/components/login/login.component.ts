import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';


import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(private _flashMessages: FlashMessagesService, private _router: Router, private _clientService: ClientService, private _route: ActivatedRoute, private _authService:AuthService) {

  }

  ngOnInit() {
  }

  onSubmit(){
    this._authService.login(this.email,this.password)
      .then((res) => {
        this._flashMessages.show('Logged in  Successfully',{cssClass:'alert-success',timeout:4000});
        this._router.navigate([`/`]);
      })
      .catch((err) => {
        this._flashMessages.show(err.message,{cssClass:'alert-danger',timeout:4000});
        this._router.navigate(['/login']);
      })
  }



}
