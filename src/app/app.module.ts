import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from "@angular/router";
import {FormsModule} from '@angular/forms';
import{FlashMessagesModule} from 'angular2-flash-messages';


//import firebase + angularfire2
import {AngularFireModule} from 'angularfire2';
import{AngularFireDatabase} from 'angularfire2/database';
import{AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//import component
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsDetailsComponent } from './components/clients-details/clients-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDhvPWEuJtgpqjflUOGn83lf2POSwvQmfU",
  authDomain: "clientpanel-1324c.firebaseapp.com",
  databaseURL: "https://clientpanel-1324c.firebaseio.com",
  projectId: "clientpanel-1324c",
  storageBucket: "clientpanel-1324c.appspot.com",
  messagingSenderId: "1052374276449"
};



const appRoutes:Routes = [
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'add-client',component:AddClientComponent,canActivate:[AuthGuard]},
  {path:'client/:id',component:ClientsDetailsComponent,canActivate:[AuthGuard]},
  {path:'edit-client/:id',component:EditClientComponent,canActivate:[AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientsDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
    SettingsComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    FlashMessagesModule
  ],
  providers: [
    AngularFireAuth,AngularFireDatabase,ClientService,AuthService,AuthGuard,SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
