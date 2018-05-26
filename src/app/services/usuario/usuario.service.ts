import { VerificaTokenGuard } from './../guards/verifica-token.guard';

import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';//(immportar solo lo que se use)
import 'rxjs/add/operator/catch';//(immportar solo lo que se use)

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import * as jwt_decode from "jwt-decode"


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  

  constructor( 
    public http: HttpClient, 
    public router: Router,
    public _modalUploadService: ModalUploadService,
    public _subirArchivoService: SubirArchivoService,
    private toastr: ToastrService
   ) {
     this.cargarStorage();
   }

   public isAuthenticated():boolean {
    //return ( this.token.length > 5 ) ? true : false;
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log( new Date().getTime() + '   ' + expiresAt  );
    return new Date().getTime() < expiresAt;
  }

  cargarStorage() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  } 
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .map((res: any) => {
        this.toastr.success( usuario.nombre, 'Usuario Creado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res.usuario;
      }).catch( err => {
        console.log(err);
        this.toastr.warning( err.error.errors.message , 'Error en creacion de usuario!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });;
  }

  guardarStorage(id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    const expiresAt = JSON.stringify((10800000) + new Date().getTime());
    // localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.usuario = usuario;
    this.token = token;
    //console.log('usuario',this.usuario);
    
    //console.log(token);
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
                .map( (resp: any) => {
                  
                  // this.guardarStorage(resp.id, resp.token, resp.usuario);
                  return true;
                });
  }

  login(usuario: Usuario){
    let url = URL_SERVICIOS + '/auth/login';
    
    
    return this.http.post(url,usuario)
              .map( (resp: any) => {
                let tokenInfo = this.getDecodedAccessToken(resp.token); // decode token
                let expireDate = tokenInfo.exp; // get token expiration dateTime
                //console.log(tokenInfo); // show decoded token object in console
                this.guardarStorage(tokenInfo.id, resp.token, tokenInfo.usuario);
                return true;
              }).catch( err => {
                console.log(err.message);
                this.toastr.warning( err.message, 'Error de login!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                return Observable.throw( err );
              });
  }
  
  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
                  }
                  this.toastr.success( this.usuario.nombre, 'Usuario Actualizado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            this.toastr.success( this.usuario.nombre, 'Imagen Actualizada!',{ timeOut: 3000,positionClass: 'toast-top-right'});//swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario';//?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
                .map( resp => {
                  this.toastr.success( 'El usuario a sido eliminado correctamente', 'USUARIO BORRADO!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  //swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }
  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url+= '?token'+ this.token;
    return this.http.get( url ).map(
      ( resp: any)=> {
        this.token = resp.token;
        localStorage.setItem('token',this.token);
        return true;
      }
    ).catch(err => {
      this.router.navigate(['/login']);
      return Observable.throw(err);
    });
  }

}
