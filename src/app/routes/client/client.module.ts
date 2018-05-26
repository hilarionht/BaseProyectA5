import { ListaProductosComponent } from './producto/lista-productos/lista-productos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { Ng2TableModule } from 'ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductoComponent } from './producto/producto/producto.component';
import { TipoProductoComponent } from './producto/tipo-producto/tipo-producto.component';
import { TipoProductosComponent } from './producto/tipo-productos/tipo-productos.component';


const routes: Routes = [
    { path: '', redirectTo: 'client' },
    { path: 'productos', component: ListaProductosComponent },
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'tipoProducto/:id', component: TipoProductoComponent },
    { path: 'tipoProductos', component: TipoProductosComponent }
    
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        Ng2TableModule,
       // AgGridModule.withComponents([AngulargridComponent]),
        NgxDatatableModule
    ],
    declarations: [
        ListaProductosComponent,
        ProductoComponent,
        TipoProductoComponent,
        TipoProductosComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClientModule { }
