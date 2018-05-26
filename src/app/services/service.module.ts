
import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { TipoProductoService } from './producto/tipo-producto.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UsuarioService,
    SharedService,
    SidebarService,
    LoginGuard,
    ProductoService,
    SubirArchivoService,
    MarcaService,
    ModeloService,
    VerificaTokenGuard,
    FacturaService

 } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports:[
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UsuarioService,
        SharedService,
        SidebarService,
        LoginGuard,
        ProductoService,
        TipoProductoService,
        SubirArchivoService,
        ModalUploadService,
        MarcaService,
        ModeloService,
        VerificaTokenGuard,
        FacturaService
    ],
    declarations:[]
})
export class ServiceModule{}