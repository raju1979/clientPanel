import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {FlashMessagesService} from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  userKey = '';

  disabledBalanceOnAdd:boolean = true;

  constructor(private _flashMessages:FlashMessagesService, private _router:Router,private _clientService:ClientService, private _settings:SettingsService,private _authService: AuthService) {

  }

  ngOnInit() {
    this.disabledBalanceOnAdd =  this._settings.getSettings().disableBalanceOnAdd;

    this._authService.getAuth()
    .subscribe((auth) => {
      if(auth){        
        this.userKey = auth.uid
      }else{
        
      }
    })

  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){

    if(valid){
      if(this.disabledBalanceOnAdd){
        value.balance = 0;
      }
      this._clientService.newClient(this.userKey,value)
      this._flashMessages.show('New client added',{cssClass:'alert-danger',timeout:4000});
      this._router.navigate(['add-client'])
    }else{
      console.log('Not Calid')
      this._flashMessages.show('Please fill in all fields',{cssClass:'alert-success',timeout:2000});
      this._router.navigate(['/'])
    }
    
  };//
  

}
