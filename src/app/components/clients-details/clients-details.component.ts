import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {

  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(private _flashMessages: FlashMessagesService, private _router: Router, private _clientService: ClientService, private _route:ActivatedRoute) {


  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    console.log(this.id);
    this._clientService.getClient(this.id)
    .subscribe((client) => {
      this.checkClient(client)
    });
  };//

  updateBalance(id:string){
    this._clientService.updateClient(id, this.client)
    .then((data) => {
      this._flashMessages.show('Balance Updated',{cssClass:'alert-success',timeout:1000})
      this._router.navigate([`/client/${this.id}`])
    })

  }

  checkClient(client){
    this.client = client
    console.log(this.client);
    if(this.client.balance > 0){
      this.hasBalance = true
    }
  };//

  onDeleteClick(){
    if(confirm("Are you sure to delete")){
      this._clientService.deleteClient(this.id)
        .then(() => {
          this._flashMessages.show('Client Removed',{cssClass:'alert-success',timeout:1000})
          this._router.navigate([`/`])
        })
    }
  };//

}
