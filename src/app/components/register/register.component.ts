import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(private _flashMessages: FlashMessagesService, private _router: Router, private _clientService: ClientService, private _route: ActivatedRoute, private _authService: AuthService) {

  }


  ngOnInit() {
  }

  onSubmit() {
    this._authService.register(this.email, this.password)
      .then((res) => {
        this._flashMessages.show('Registered Successfully, now login',{cssClass:'alert-danger',timeout:4000});
        this._router.navigate(['/login']);

      }).catch((err) => {
        this._flashMessages.show('Error, try again',{cssClass:'alert-danger',timeout:4000});
        this._router.navigate(['/register']);
      })
  }
}
