import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  /**
   *
   */
  constructor(public _userService: UsuarioService , public router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this._userService.isAuthenticated()) {
      console.log("paso el guard");
      return true;

    } else {
      console.log('no paso ni el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
