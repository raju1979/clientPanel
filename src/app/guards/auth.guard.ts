import {Injectable} from "@angular/core";
import {CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";


@Injectable()

export class AuthGuard implements CanActivate{    

    constructor(private _afAuth:AngularFireAuth, private _router:Router){

    }

    canActivate():  Observable<boolean> {
        return this._afAuth.authState.map(auth => {
            if(!auth){
                this._router.navigate(['/login']);
                return false;
            }else{
                return true;
            }
        });
    }

}