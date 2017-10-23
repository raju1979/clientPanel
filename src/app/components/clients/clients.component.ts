import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:any;
  totalOwed:number;

  constructor(private _clientService:ClientService) { 

    

  }

  ngOnInit() {
    let clientUUID =this._clientService.getClientUUid();
    this._clientService.getClients()
      .subscribe(
        (clients) => {
          console.log(clients)
          this.clients = clients;
          console.log(this.clients);
          this.totalOwed = this.getTotalOwed();
        }
      )
  }

  getTotalOwed(){
    let total:number;

    total = this.clients.reduce((acc, el) => acc + (el.balance * 1), 0);
    console.log(total)
    return total;

  }

}
