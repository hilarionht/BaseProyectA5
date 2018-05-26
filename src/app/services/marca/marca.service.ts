import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../../models/marca.model';
import { URL_SERVICIOS } from '../../config/config';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class MarcaService {

  totalMarcas: number = 0;
  constructor(
    public http: HttpClient, 
    public router: Router, 
    public toastr: ToastrService,
    public _usuarioService:UsuarioService
  ) { }
  crearMarca( nombre: string ) {

    let url = URL_SERVICIOS + '/marca';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.producto );

  }

  agregarMarca(marca: Marca, _id: string) {
    let url = URL_SERVICIOS + '/marca';
    return this.http.post(url, marca)
                    .map((res: any) => {
                      this.toastr.success( marca.nombre, 'Marca Creado',{ timeOut: 3000,positionClass: 'toast-top-right'});
                      return res.marca;
                    });
  }

  cargarMarcas(desde: number=0,limite:number=0) { 
    console.log('consultando');
    
    let url = URL_SERVICIOS + '/marca/?token='+ this._usuarioService.token+'&desde='+desde+'&limite='+limite;
    
    return this.http.get( url ).map( (resp : any) => {
        this.totalMarcas = resp.total;
        return resp;
     });
  }

  obtenerMarca(id: string){
    let url = URL_SERVICIOS + '/marca/' + id;
    url += '?token=' + this._usuarioService.token;
    console.log(url, id);
    console.log('obtener marcas.....');
    
    
    return this.http.get( url )
              .map( (resp: any) => resp.marca 
                );
  }

  buscarMarca( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/buscarmarcas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => 
                  
                  resp.buscarmarcas

                 );

  }

  guardarMarca( marca: Marca ) {

    let url = URL_SERVICIOS + '/marca';

    if ( marca._id ) {
      // actualizando
      url += '/' + marca._id;
      url += '?token=' + this._usuarioService.token;
     
      
      return this.http.put( url, marca )
                .map( (resp: any) => {
                  this.toastr.success( marca.nombre, 'Marca Actualizado',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return resp.marca;
                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, marca )
              .map( (resp: any) => {
                this.toastr.success( marca.nombre, 'Marca Creado',{ timeOut: 3000,positionClass: 'toast-top-right'});
                return resp.marca;
               
              });
    }
  }

  eliminarMarca( id: string){
    let url = URL_SERVICIOS + '/marca/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( (resp:any) => {
                this.toastr.success( resp.marca.nombre, 'Marca Eliminado',{ timeOut: 3000,positionClass: 'toast-top-right'});
                return resp;
              });
  }

  actualizarmarca( marca: Marca ) {

    let url = URL_SERVICIOS + '/marca/' + marca._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, marca )
              .map( (resp: any) => {
                this.toastr.success( resp.marca.nombre, 'Marca Actualizado',{ timeOut: 3000,positionClass: 'toast-top-right'});              
                return resp.marca;
              });

  }
}
