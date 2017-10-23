import { Injectable } from '@angular/core';


import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";


import {Observable} from 'rxjs';
import{AngularFireAuth} from 'angularfire2/auth';
import { Client } from '../models/Client';


@Injectable()
export class ClientService {

clientsListRef$: any;
  
 clientsData:any;

 clientUUID:string;

  constructor(private firebaseApp: FirebaseApp,private _angualrFireDB: AngularFireDatabase) { 

    // this.clientsListRef$ = this._angualrFireDB.list<any>('/clients').valueChanges();
    this.clientsData = this._angualrFireDB.list('/clients');

  }

  setClientUUid(uuid){
    this.clientUUID = uuid;
  }

 getClientUUid(){
    return this.clientUUID;
  }

  getClients(){
    //return this.clients = this.itemsCollection.valueChanges();

    let localClientList =  this._angualrFireDB.list('/clients/'+ this.clientUUID);

    this.clientsListRef$ = localClientList.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    return this.clientsListRef$;
  }

  newClient(userKey,client){
    const clientsRef = this._angualrFireDB.list('clients/'+userKey);
    clientsRef.push(client);

  }

  getClient(id){
    return this._angualrFireDB.object(`clients/${this.clientUUID}/${id}`).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    })
  };//

  updateClient(id:string,client:Client){

    let obj =  this._angualrFireDB.object(`clients/${this.clientUUID}/${id}`);
    return obj.update({balance:client.balance})
    
  }

  deleteClient(id:String){
    let obj =  this._angualrFireDB.object(`clients/${this.clientUUID}/${id}`);
    return obj.remove();
  }

  editClient(client,id:string){
    let obj =  this._angualrFireDB.object(`clients/${this.clientUUID}/${id}`);
    console.log(client,id);
    return obj.update(client);

  }

}
