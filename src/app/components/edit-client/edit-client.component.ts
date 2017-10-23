import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';


@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  };
  disableBalanceOnEdit:boolean = true;


  constructor(private _flashMessages: FlashMessagesService, private _router: Router, private _clientService: ClientService, private _route:ActivatedRoute) {

    

   }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._clientService.getClient(this.id)
    .subscribe((client) => {
      this.checkClient(client)
    });
  };//

  checkClient(client){
    this.client = client;
    console.log(this.client);
  };//

  onSubmit({value,valid}:{value:Client,valid:boolean}){
    
        if(valid){
          this._clientService.editClient(value,this.id);
          this._flashMessages.show('Edited Successfully',{cssClass:'alert-danger',timeout:4000});
          this._router.navigate([`/client/${this.id}`]);
        }else{
          console.log('Not Valid')
          this._flashMessages.show('Please fill in all fields',{cssClass:'alert-success',timeout:2000});
          this._router.navigate([`edit-client/${this.id}`]);
        }
        
      };//

}
