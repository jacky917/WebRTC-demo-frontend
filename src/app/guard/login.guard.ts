import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";


@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate{
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // console.log("token = " + localStorage.getItem("access_token"));
    if(this.auth.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
